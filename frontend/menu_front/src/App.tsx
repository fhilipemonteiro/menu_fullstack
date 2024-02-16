import { BrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoutes from './routes/private.routes';
import PublicRoutes from './routes/public.routes';

export default function App() {
  const auth = false;
  return (
    <>
      <BrowserRouter>
        {auth ? <PrivateRoutes /> : <Navigate to={'/auth/login'} />}
        <PublicRoutes />
      </BrowserRouter>
    </>
  );
}
