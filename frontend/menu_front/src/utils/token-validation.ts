import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function isTokenValid() {
  try {
    const token = Cookies.get('access_token');

    const { exp } = jwtDecode(String(token));

    const expirationDate = new Date(Number(exp) * 1000);

    return expirationDate >= new Date();
  } catch {
    return false;
  }
}
