import { NextResponse } from 'next/server';
import { groq } from 'next-sanity';
import { sanityClient } from '@/sanity/client';

const query = groq`*[_type == "product"] {
  _id,
  ...
} | order(_createdAt asc)`;

export async function GET() {
  const products: Product[] = await sanityClient.fetch(query);
  return NextResponse.json({ products });
}
