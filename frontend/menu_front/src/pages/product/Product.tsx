// import { useState } from 'react';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
// import CardProduct from '../../components/card-product/CardProduct';
import { getProducts } from './services/get-product';

import { MdAddCircleOutline, MdFilterAlt } from 'react-icons/md';
import './styles/product.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CardProduct from '../../components/card-product/CardProduct';
import { IProduct } from './interfaces/product';
export default function Product(): JSX.Element {
  const [products, setProducts] = useState<IProduct[]>([]);

  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken && accessToken.trim() !== '') {
        try {
          const { data } = await getProducts(accessToken);
          setProducts(data);
        } catch (error) {
          const { status } = Object(error).response;
          if (status === 401) {
            alert('Não autorizado.');
          } else {
            alert('Ocorreu um erro inesperado, tente novamente mais tarde.');
          }
        }
      }
    };
    fetchData();
  }, [accessToken]);

  return (
    <>
      <div className='container-parent-product'>
        <Header />
        <div className='container-wrapper-menu'>
          <div className='container-wrapper-btn-menu'>
            <Button className='btn-product'>
              <div className='name-buton-product'>Novo Produto</div>
              <div className='icon-button-product'>
                <MdAddCircleOutline className='icon' />
              </div>
            </Button>
            <Button className='btn-product'>
              <div className='name-buton-product'>Filtro</div>
              <div className='icon-button-product'>
                <MdFilterAlt className='icon' />
              </div>
            </Button>
          </div>
          <div className='container-warapper-cards'>
            {products.map(product => (
              <CardProduct
                key={product.id}
                id={product.id}
                name={product.name}
                qty={product.qty}
                price={product.price}
                photo={product.photo}
                categories={product.categories}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
