import { Routes, Route } from 'react-router-dom';
import Product from '../pages/products/Product';

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path='/product' element={<Product />} />
    </Routes>
  );
}
