import axios from 'axios';

interface IProduct {
  name: string;
  price: number;
  qty: number;
  photo: string;
  categories: ICategory[];
}

interface ICategory {
  id: string;
}

export const createProduct = async (
  { name, price, qty, photo, categories }: IProduct,
  accessToken: string,
) => {
  const response = await axios.post(
    'http://localhost:3000/products',
    { name, price, qty, photo, categories },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response;
};
