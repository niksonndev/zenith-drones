import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Fragment } from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Basket from '../components/Basket';
import Header from '../components/Header';
import Landing from '../components/Landing';
import Products from '../components/Products';
import { getServerCategories, getServerProducts } from '../lib/sanity-server';

interface Props {
  categories: Category[];
  products: Product[];
}

const Home = ({ categories, products }: Props) => {
  const showProducts = (category: number) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => <Products product={product} key={product._id} />); // filter products by category
  };

  return (
    <div className=''>
      <Head>
        <title>Apple Redesign</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <Basket />

      <main className='relative h-[200vh] bg-[#E7ECEE]'>
        <Landing />
      </main>
      <section className='relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]'>
        <div className='space-y-10 py-16'>
          <h1 className='text-center text-4xl font-medium tracking-wide text-white md:text-5xl'>
            New Promos
          </h1>

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
              <TabPanel className='tabPanel'>{showProducts(0)}</TabPanel>
              <TabPanel className='tabPanel'>{showProducts(1)}</TabPanel>
              <TabPanel className='tabPanel'>{showProducts(2)}</TabPanel>
              <TabPanel className='tabPanel'>{showProducts(3)}</TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </section>
    </div>
  );
};

export default Home;

// Backend code
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [categories, products] = await Promise.all([
    getServerCategories(),
    getServerProducts(),
  ]);

  return {
    props: {
      categories,
      products,
    },
  };
};
