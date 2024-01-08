export type Size = "xs" | "s" | "m" | "l" | "xl";

export type IProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

const BASE_URL = "https://api.escuelajs.co/api/v1";

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data as IProduct[];
};

export const getProduct = async (id: number) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const data = await response.json();

  const isEmpty = Object.keys(data).length === 0;
  if (isEmpty) throw new Error("Product not found");

  return data as IProduct;
};
