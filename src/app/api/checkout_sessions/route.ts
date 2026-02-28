import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { urlFor } from '@/sanity/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01',
});

export async function POST(request: Request) {
  const { items } = (await request.json()) as { items: Product[] };

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
        images: [urlFor(item.image[0]).url()],
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  try {
    const origin = request.headers.get('origin') || '';
    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: transformedItems,
      payment_intent_data: {},
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        images: JSON.stringify(items.map((item) => item.image[0].asset?.url ?? '')),
      },
    };
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ statusCode: 500, message }, { status: 500 });
  }
}
