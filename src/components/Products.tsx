'use client';

import { useState } from 'react';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/sanity/client';
import { useBasketStore } from '@/store/useBasketStore';
import Logo from './Logo';
import { ShoppingCart } from 'lucide-react';

interface Props {
  product: Product;
}

function Products({ product }: Props) {
  const addToBasket = useBasketStore((state) => state.addToBasket);
  const [showAdded, setShowAdded] = useState(false);
  const hasImage = product.image?.length > 0;
  const hasSpecs =
    product.batteryLife != null ||
    product.maxSpeed != null ||
    product.cameraResolution != null ||
    product.weight != null;

  const addItemToBasket = () => {
    addToBasket(product);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className='flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383C] p-8 md:h-fit md:min-h-[500px] md:w-[400px] md:p-10'>
      <div className='relative h-64 w-full md:h-72'>
        {hasImage ? (
          <Image
            src={urlFor(product.image[0]).url()}
            alt={product.title}
            fill
            className='object-contain'
            sizes='(max-width: 768px) 320px, 400px'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-lg bg-[#232428]/50'>
            <Logo width={80} height={80} className='text-white/60' />
          </div>
        )}
      </div>
      <div className='flex flex-1 flex-col space-y-3'>
        <div className='flex items-start justify-between gap-3'>
          <div className='space-y-1 text-xl text-white md:text-2xl'>
            <p className='font-semibold'>{product.title}</p>
            <p className='text-lg text-white/90'>
              <Currency quantity={product.price} currency='BRL' />
            </p>
          </div>
          <button
            type='button'
            className='relative flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 transition hover:opacity-90 md:h-[70px] md:w-[70px]'
            onClick={addItemToBasket}
            aria-label={`Adicionar ${product.title} ao carrinho`}>
            <AnimatePresence mode='wait'>
              {showAdded ? (
                <motion.span
                  key='added'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className='text-xs font-medium text-white'>
                  Adicionado!
                </motion.span>
              ) : (
                <motion.span
                  key='icon'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <ShoppingCart className='h-8 w-8 text-white' />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
        {hasSpecs && (
          <div className='border-t border-white/10 pt-3'>
            <p className='mb-2 text-xs font-medium uppercase tracking-wider text-white/60'>
              Especificações
            </p>
            <ul className='space-y-1 text-sm text-white/90'>
              {product.batteryLife != null && (
                <li>Bateria: {product.batteryLife} min</li>
              )}
              {product.maxSpeed != null && (
                <li>Vel. máx.: {product.maxSpeed} km/h</li>
              )}
              {product.cameraResolution != null && (
                <li>Câmera: {product.cameraResolution}</li>
              )}
              {product.weight != null && (
                <li>Peso: {product.weight >= 1000 ? `${(product.weight / 1000).toFixed(1)} kg` : `${product.weight} g`}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
