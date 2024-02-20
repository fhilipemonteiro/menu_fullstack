import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { IAuthContext } from '../context/AuthContext';

export default async function useAuthInitialization({ setAccessToken, setLoggedIn }: IAuthContext) {
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      setAccessToken?.(token);
      setLoggedIn?.(true);
    }
  }, [setAccessToken, setLoggedIn]);
}
