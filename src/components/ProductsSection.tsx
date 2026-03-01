'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Products from './Products';

interface Props {
  categories: Category[];
  products: Product[];
}

export default function ProductsSection({ categories, products }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredProducts = products.filter(
    (product) => product.category._ref === categories[activeIndex]?._id,
  );

  return (
    <div>
      <div className='flex justify-center'>
        {categories.map((category, index) => (
          <motion.button
            key={category._id}
            type='button'
            id={category._id}
            onClick={() => setActiveIndex(index)}
            className={`whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
              activeIndex === index
                ? 'borderGradient bg-[#35383C] text-white'
                : 'border-b-2 border-[#35383C] text-[#747474]'
            }`}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}>
            {category.title}
          </motion.button>
        ))}
      </div>
      <div className='mx-auto max-w-fit pt-10 pb-24 sm:px-4'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeIndex}
            className='tabPanel'
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}>
            {filteredProducts.map((product) => (
              <Products product={product} key={product._id} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
