import { NextResponse } from 'next/server';
import { groq } from 'next-sanity';
import { sanityClient } from '@/sanity/client';

const query = groq`*[_type == "category"] {
  _id,
  ...
}`;

export async function GET() {
  const categories = await sanityClient.fetch(query);
  return NextResponse.json({ categories });
}
