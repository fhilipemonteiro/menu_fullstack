import axios from 'axios';

export const getProducts = async (accessToken: string) => {
  const response = await axios.get('http://localhost:3000/products', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
