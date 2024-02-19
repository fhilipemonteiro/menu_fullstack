import { BrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoutes from './routes/private.routes';
import PublicRoutes from './routes/public.routes';
import { isTokenValid } from './utils/token-validation';
import useAuthInitialization from './utils/use-auth-initialization';

export default function App() {
  useAuthInitialization();
  return (
    <>
      <BrowserRouter>
        {isTokenValid() ? <PrivateRoutes /> : <Navigate to={'/auth/login'} replace />}
        <PublicRoutes />
      </BrowserRouter>
    </>
  );
}
