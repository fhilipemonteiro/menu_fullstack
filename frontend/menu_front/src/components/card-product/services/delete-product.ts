import axios from 'axios';

export const deleteProduct = async (id: string, accessToken: string) => {
  const response = await axios.delete(`http://localhost:3000/products/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
