'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import CheckoutProduct from '@/components/CheckoutProduct';
import Header from '@/components/Header';
import { useBasketStore } from '@/store/useBasketStore';
import Currency from 'react-currency-formatter';
import { ChevronDown } from 'lucide-react';
import { Stripe } from 'stripe';
import { fetchPostJSON } from '@/utils/api-helpers';
import getStripe from '@/utils/get-stripejs';

export default function CheckoutPage() {
  const items = useBasketStore((state) => state.items);
  const basketTotal = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.price, 0),
  );
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] },
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const createCheckoutSession = async () => {
    setLoading(true);
    const checkoutSessions: Stripe.Checkout.Session = await fetchPostJSON(
      '/api/checkout_sessions',
      { items },
    );
    if ((checkoutSessions as { statusCode?: number }).statusCode === 500) {
      console.error((checkoutSessions as { message?: string }).message);
      setLoading(false);
      return;
    }
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: (checkoutSessions as { id: string }).id,
    });
    if (error) console.warn(error.message);
    setLoading(false);
  };

  return (
    <div className='min-h-screen overflow-hidden bg-[#E7ECEE]'>
      <Header />
      <main className='mx-auto max-w-3xl px-8 pb-24 md:max-w-6xl'>
        <div className='px-5'>
          <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
            {items.length > 0 ? 'Review your bag.' : 'Your bag is empty'}
          </h1>
          <p className='my-4'>Free delivery and returns.</p>
          {items.length === 0 && (
            <Button title='Continue Shopping' onClick={() => router.push('/')} />
          )}
        </div>

        {items.length > 0 && (
          <div className='mx-auto max-w-3xl px-8 md:max-w-6xl'>
            {Object.entries(groupedItemsInBasket).map(([key, groupItems]) => (
              <CheckoutProduct key={key} items={groupItems} id={key} />
            ))}

            <div className='my-12 mx-auto mt-6 ml-auto max-w-3xl md:max-w-6xl'>
              <div className='divide-y divide-gray-300'>
                <div className='pb-4'>
                  <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={basketTotal} currency='BRL' />
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-x-1 lg:flex-row'>
                      Estimated tax for:{' '}
                      <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
                        Enter zip code
                        <ChevronDown className='h-6 w-6' />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>
                <div className='flex justify-between pt-4 text-xl font-semibold'>
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={basketTotal} currency='BRL' />
                  </h4>
                </div>
              </div>

              <div className='my-14 space-y-4'>
                <h4 className='text-xl font-semibold'>How would you like to check out?</h4>
                <div className='flex flex-col gap-4 md:flex-row'>
                  <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center'>
                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>$283.16/mo. at 0% APR</span>
                    </h4>
                    <Button title='Check Out with Apple card Monthly Installments' />
                    <p className='mt-2 max-w-[240px] text-[13px]'>
                      $0.00 due today, which includes applicable full-price items, down payments,
                      shipping, and taxes.
                    </p>
                  </div>
                  <div className='flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2'>
                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                      Pay in full
                      <span>
                        <Currency quantity={basketTotal} currency='BRL' />
                      </span>
                    </h4>
                    <Button
                      noIcon
                      title='Check Out'
                      width='w-full'
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
