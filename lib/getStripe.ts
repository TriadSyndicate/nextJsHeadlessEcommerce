import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
let publishableKey: any = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(publishableKey)
    }

    return stripePromise
}

export default getStripe