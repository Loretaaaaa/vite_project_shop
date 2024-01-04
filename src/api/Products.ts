export type Size = "xs" | "s" | "m" | "l" | "xl";

export type IProduct = {
  id: number;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: number;
  color: string;
  sizes: Size[];
};

export const getProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  return data as IProduct[];
};

export const getProduct = async (id: number) => {
  const response = await fetch(`http://localhost:3000/products/${id}`);
  const data = await response.json();
  return data as IProduct;
};
