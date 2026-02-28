import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity/sanity.config';

export const dynamic = 'force-static';
export const revalidate = 0;

export default function StudioPage() {
  return (
    <div className="fixed inset-0 h-screen w-screen">
      <NextStudio config={config} />
    </div>
  );
}
