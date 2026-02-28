'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Fragment } from 'react';
import Products from './Products';

interface Props {
  categories: Category[];
  products: Product[];
}

export default function ProductsSection({ categories, products }: Props) {
  const showProducts = (categoryIndex: number) => {
    return products
      .filter((product) => product.category._ref === categories[categoryIndex]._id)
      .map((product) => <Products product={product} key={product._id} />);
  };

  return (
    <TabGroup>
      <TabList className='flex justify-center'>
        {categories.map((category) => (
          <Tab key={category._id} as={Fragment}>
            {({ selected }) => (
              <button
                id={category._id}
                className={`whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                  selected
                    ? 'borderGradient bg-[#35383C] text-white'
                    : 'border-b-2 border-[#35383C] text-[#747474]'
                }`}>
                {category.title}
              </button>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels className='mx-auto max-w-fit pt-10 pb-24 sm:px-4'>
        {categories.map((_, index) => (
          <TabPanel key={index} className='tabPanel'>
            {showProducts(index)}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
