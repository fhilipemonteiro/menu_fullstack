import { Routes, Route } from 'react-router-dom';
import Product from '../pages/product/Product';

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path='/product' element={<Product />} />
    </Routes>
  );
}
