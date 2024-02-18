import Cookies from 'js-cookie';

export default async function logout() {
  await Cookies.remove('access_token');
}
