import { prisma } from '@/lib/prisma';

export async function getServerCategories() {
  return prisma.category.findMany({
    orderBy: { title: 'asc' },
  });
}

export async function getServerProducts() {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'asc' },
  });
}

