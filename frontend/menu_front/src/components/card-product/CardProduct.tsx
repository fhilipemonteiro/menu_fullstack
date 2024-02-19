interface ICardProduct {
  id: string;
  name: string;
  qty: number;
  price: number;
  photo: string;
  categories: ICategory[];
  onProductDelete: () => void;
}

interface ICategory {
  id: string;
  name: string;
  parent_id: string | null;
}

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { deleteProduct } from './services/delete-product';

import Button from '../button/Button';
import './style/card-product.scss';

export default function CardProduct({
  id,
  name,
  qty,
  price,
  photo,
  categories,
  onProductDelete,
}: ICardProduct): JSX.Element {
  const { accessToken } = useContext(AuthContext);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProduct(id, accessToken);
      onProductDelete();
      return response;
    } catch {
      alert('Ocorreu um erro inesperado, tente novamente mais tarde.');
    }
  };

  return (
    <div className='card-product'>
      <div className='card-product-img'>
        <img src={`${photo}`} />
      </div>
      <div className='card-product-info'>
        <div className='card-product-info-name'>{name}</div>
        <div className='card-product-info-qty-and-price'>
          <div className='card-product-qty-wrapper'>
            <div className='card-product-info-qty-title'>Estoque:</div>
            <div className='card-product-info-qty'>{String(qty)}</div>
          </div>

          <div className='card-product-info-price-wrapper'>
            <div className='card-product-info-price-title'>Valor:</div>
            <div className='card-product-info-price'>
              {Number(price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </div>
          </div>
        </div>
        <div className='card-product-btns'>
          <Button id='btn-card-edit'>Editar</Button>
          <Button id='btn-card-delete' onClick={() => handleDelete(id)}>
            Excluir
          </Button>
        </div>
      </div>

      <div className='card-product-categories'>
        {categories.map(category => (
          <div className='card-product-category' key={category.id}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
}
