import CreateSubButton from "@/components/create-sub-button";
import { plans } from "@/constants/plans";
import { getActiveSubscription } from "@/actions/sub";
import UpdateSubButton from "@/components/update-sub-button";
import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function Plans() {
	const session = await auth.api.getSession({ headers: await headers() });
	const data = await getActiveSubscription();
	const activeSub = data.subscription;

	return (
		<div className="container mx-auto py-12">
			<h1 className="text-3xl font-bold text-center mb-8">
				Subscription Plans
			</h1>

			<div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
				{plans.map((plan) => {
					const planName =
						plan.name.charAt(0).toUpperCase() + plan.name.slice(1);
					const buttonText = activeSub ? "Switch to this plan" : "Subscribe";

					return (
						<div key={plan.id} className={`border rounded-lg p-6 shadow-sm`}>
							<h2 className="text-xl font-semibold mb-2">{planName}</h2>
							<p className="text-2xl font-bold mb-6">
								{plan.price}
								<span className="text-sm font-normal">/month</span>
							</p>
							<ul className="space-y-2 mb-6">
								{plan.features.map((f, i) => (
									<li key={i}>{f}</li>
								))}
							</ul>

							{activeSub?.plan === plan.name ? (
								<>
									{activeSub.cancelAtPeriodEnd ? (
										<p className="text-red-400 text-xs">
											Your subscription will be cancelled on:{" "}
											{activeSub.periodEnd?.toLocaleDateString()}
										</p>
									) : (
										<p className="font-bold text-green-400">
											You are subscribed to this plan.
										</p>
									)}
								</>
							) : activeSub ? (
								<UpdateSubButton
									buttonText={buttonText}
									plan={plan}
									subId={activeSub.stripeSubscriptionId as string}
								/>
							) : (
								<CreateSubButton buttonText={buttonText} plan={plan} />
							)}

							{session?.user.trialAllowed && (
								<p className="text-xs text-center mt-2 text-gray-500">
									Includes {plan.trialDays}-day free trial
								</p>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
