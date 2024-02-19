import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
// import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export default async function useAuthInitialization() {
  const { setAccessToken, setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      setAccessToken?.(token);
      setLoggedIn?.(true);
    }
  }, [setAccessToken, setLoggedIn]);
}
