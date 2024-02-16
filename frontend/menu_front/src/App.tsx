import { useContext } from 'react';
import { BrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoutes from './routes/private.routes';
import PublicRoutes from './routes/public.routes';

import { AuthContext } from './context/AuthContext';

export default function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        {loggedIn ? <PrivateRoutes /> : <Navigate to={'/auth/login'} replace />}
        <PublicRoutes />
      </BrowserRouter>
    </>
  );
}
