import { getServerCategories, getServerProducts } from '@/data/queries';
import Header from '@/components/Header';
import Basket from '@/components/Basket';
import HeroExplosion from '@/components/HeroExplosion';
import ProductsSection from '@/components/ProductsSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getServerCategories(),
    getServerProducts(),
  ]);

  return (
    <div>
      <Header />
      <Basket />
      <div className="pt-16">
        <HeroExplosion />
      </div>
      <section className='relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]'>
        <div className='space-y-10 py-16'>
          <h1 className='text-center text-4xl font-medium tracking-wide text-white md:text-5xl'>
            New Promos
          </h1>
          <ProductsSection categories={categories} products={products} />
        </div>
      </section>
    </div>
  );
}
