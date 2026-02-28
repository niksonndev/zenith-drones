'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity/sanity.config';

export default function Studio() {
  return (
    <div className="fixed inset-0 h-screen w-screen">
      <NextStudio config={config} />
    </div>
  );
}
