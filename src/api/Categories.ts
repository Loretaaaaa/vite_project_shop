import { BASE_URL } from ".";

export type ICategory = {
  id: number;
  name: string;
  image: string;
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  const data = await response.json();
  return data as ICategory[];
};
