export const fetchProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getProducts`);

    if (!res.ok) {
      console.error('Faild to fetch products: ', res.statusText);
      return [];
    }

    const data = await res.json();
    const products: Product[] = data?.products;

    return products;
  } catch (error) {
    console.error('Error fetching products: ', error);
    return [];
  }
};
