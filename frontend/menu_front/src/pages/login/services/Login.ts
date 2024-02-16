import axios from 'axios';

interface ILogin {
  email: string;
  password: string;
}

export const login = async (login: ILogin) => {
  const { email, password } = login;

  const response = await axios.post(
    'http://localhost:3000/auth/login',
    { email, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};
