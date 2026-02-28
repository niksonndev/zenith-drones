import { groq } from 'next-sanity';
import { sanityClient } from '../sanity';

const categoriesQuery = groq`*[_type == "category"] {
  _id,
  ...
}`;

const productsQuery = groq`*[_type == "product"] {
  _id,
  ...
} | order(_createdAt asc)`;

export async function getServerCategories(): Promise<Category[]> {
  try {
    return await sanityClient.fetch(categoriesQuery);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getServerProducts(): Promise<Product[]> {
  try {
    return await sanityClient.fetch(productsQuery);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
