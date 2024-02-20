import axios from 'axios';

export const getCategories = async (accessToken: string) => {
  const { data } = await axios.get('http://localhost:3000/category', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
