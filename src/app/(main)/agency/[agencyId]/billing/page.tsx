import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { addOnProducts } from "@/lib/constants";

type Props = {
  params: { agencyId: string };
};

const BillinPage = async ({ params }: Props) => {
  const addOns = await stripe.products.list({
    ids: addOnProducts.map((product) => product.id),
    expand: ["data.default_price"],
  });

  const agencySubscription = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    select: {
      customerId: true,
      Subscription: true,
    },
  });

  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  });

  return <div>page</div>;
};

export default BillinPage;
