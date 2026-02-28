import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from './Button';

const Landing = () => {
  return (
    <section className='sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8'>
      <div className='space-y-8'>
        <h1 className='space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl'>
          <span className='block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent'>
            Powered
          </span>
          <span className='block'>By Intellect</span>
          <span className='block'>Driven By Values</span>
        </h1>

        <div className='space-x-8'>
          <Button title='Buy Now' />
          <Link href='#' className='link'>
            Learn More
          </Link>
        </div>
      </div>

      <div className='relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]'>
        <Image
          src='/iphone.png'
          alt='Product showcase'
          fill
          className='object-contain'
          sizes='(max-width: 1024px) 450px, 600px'
        />
      </div>
    </section>
  );
};

export default Landing;
