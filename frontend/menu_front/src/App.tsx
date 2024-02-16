import { BrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoutes from './routes/private.routes';
import PublicRoutes from './routes/public.routes';
import { isTokenValid } from './utils/authUtils';

export default function App() {
  return (
    <>
      <BrowserRouter>
        {isTokenValid() ? <PrivateRoutes /> : <Navigate to={'/auth/login'} replace />}
        <PublicRoutes />
      </BrowserRouter>
    </>
  );
}
