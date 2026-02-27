import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Landing from '../components/Landing';
import { Tab } from '@headlessui/react';

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Apple Redesign</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className='relative h-[200vh] bg-[#E7ECEE]'>
        <Landing />
      </main>
      <section className='relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]'>
        <div className='space-y-10 py-16'>
          <h1 className='text-center text-4xl font-medium tracking-wide text-white md:text-5xl'>
            New Promos
          </h1>

          <Tab.Group>
            <Tab.List className='flex justify-center'>
              <Tab>iPhone</Tab>
            </Tab.List>
            <Tab.Panels className='mx-auto max-w-fit pt-10 pb-24 sm:px-4'>
              <Tab.Panel className='tabPanel'></Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  );
};

export default Home;

// Backend code
export const getServerSideProps: GetServerSideProps = async () => {
  /* const categories = await fetchCategories() */

  return {
    props: {},
  };
};
