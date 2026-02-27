import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'z7cvaug1',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient = createClient(config);

const imageBuilder = createImageUrlBuilder(sanityClient);

export const urlFor = (source) => imageBuilder.image(source);
