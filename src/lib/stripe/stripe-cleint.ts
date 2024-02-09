import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromis: Promise<Stripe | null>;

export const getStripe = (connectedAccountId?: string) => {
  if (!stripePromis) {
    stripePromis = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
      { stripeAccount: connectedAccountId }
    );
  }

  return stripePromis;
};
