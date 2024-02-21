import axios from 'axios';

interface IProduct {
  name?: string;
  price?: number;
  qty?: number;
  photo?: string;
}

export const updateProduct = async (id: string, data: IProduct, accessToken: string) => {
  const response = await axios.patch(`http://localhost:3000/products/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
