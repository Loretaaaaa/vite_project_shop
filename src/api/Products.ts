import { BASE_URL } from ".";

export type Size = "xs" | "s" | "m" | "l" | "xl";

export type IProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

export const getProducts = async ({
  page = 0,
  pageSize = 10,
  title,
  categoryId,
}: {
  page: number;
  pageSize?: number;
  title?: string;
  categoryId?: number;
}) => {
  let url = `${BASE_URL}/products?limit=${pageSize}&offset=${page * pageSize}`;
  if (title) {
    url += `&title=${encodeURIComponent(title)}`;
  }
  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }
  const response = await fetch(url);
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
