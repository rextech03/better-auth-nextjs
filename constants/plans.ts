export interface Plan {
  id: number,
  name: string,
  priceId: string,
  limits: any,
  features: string[],
  price: number,
  trialDays: number
}

export const plans: Plan[] = [
  {
    id: 1, // custom field
    name: "basic",
    priceId: "price_1RCQSdDYd93YQoGLwPk9pE1F",
    limits: {
      tokens: 100
    },
    features: ["Gives you access to basic features!"],
    price: 9.99,
    trialDays: 7
  },
  {
    id: 2,
    name: "pro",
    priceId: "price_1RCQTFDYd93YQoGLGlVkAFTa",
    limits: {
      tokens: 300
    },
    features: ["Gives you access to pro features!"],
    price: 29.99,
    trialDays: 7
  },
  {
    id: 3,
    name: "ultra",
    priceId: "price_1RCQTRDYd93YQoGLLd7bh8Kf",
    limits: {
      tokens: 900
    },
    features: ["Gives you access to ultra features!"],
    price: 59.99,
    trialDays: 7
  }
]