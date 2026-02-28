import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { projectId, dataset, apiVersion } from './env';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

const imageBuilder = createImageUrlBuilder(sanityClient);

export const urlFor = (source: Parameters<typeof imageBuilder.image>[0]) =>
  imageBuilder.image(source);
