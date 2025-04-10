import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/actions/email";
import { openAPI } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import Stripe from "stripe";
import { stripe } from "@better-auth/stripe"
import { Plan, plans } from "./constants/plans";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    // BUG: Prob a bug with updateAge method. It throws an error - Argument `where` of type SessionWhereUniqueInput needs at least one of `id` arguments. 
    // As a workaround, set updateAge to a large value for now.
    updateAge: 60 * 60 * 24 * 7, // 7 days (every 7 days the session expiration is updated)
    cookieCache: {
      enabled: false,
      maxAge: 5 * 60 // Cache duration in seconds
    }
  },
  user: {
    additionalFields: {
      trialAllowed: {
        type: "boolean",
        required: true,
      },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }) => {
        await sendEmail({
          to: newEmail,
          subject: 'Verify your email change',
          text: `Click the link to verify: ${url}`
        })
      }
    }
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    openAPI(),
    admin({
      impersonationSessionDuration: 60 * 60 * 24 * 7, // 7 days
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: plans,
        getCheckoutSessionParams: async ({ user, plan }) => {

          const checkoutSession: {
            params: {
              subscription_data?: {
                trial_period_days: number
              }
            }
          } = {
            params: {},
          }

          if (user.trialAllowed) {
            checkoutSession.params.subscription_data = {
              trial_period_days: (plan as Plan).trialDays
            }
          }

          return checkoutSession;
        },
        onSubscriptionComplete: async ({ event }) => {
          const eventDataObject = event.data.object as Stripe.Checkout.Session;
          const userId = eventDataObject.metadata?.userId;

          console.log("Setting trialAllowed to false.");
          await prisma.user.update({
            where: { id: userId },
            data: { trialAllowed: false }
          })
        },
      }
    })
  ], // api/auth/reference
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      console.log("Url for resetting the password: ", url);
      // await sendEmail({
      //   to: user.email,
      //   subject: "Reset your password",
      //   text: `Click the link to reset your password: ${url}`,
      // });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      console.log("Verification url to verify the email: ", verificationUrl);
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${verificationUrl}`,
      });
    },
  }
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
