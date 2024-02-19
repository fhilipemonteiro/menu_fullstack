// interface ICardProduct {
//   id: string;
//   name: string;
//   qty: number;
//   price: number;
//   photo: string;
//   categories: ICategory[];
// }

// interface ICategory {
//   id: string;
//   name: string;
//   parent_id?: string;
// }

import Button from '../button/Button';
import './style/card-product.scss';

export default function CardProduct() {
  return (
    <div className='card-product'>
      <div className='card-product-img'>
        <img src={'https://http2.mlstatic.com/D_NQ_NP_970774-MLB46093815003_052021-O.jpg'} />
      </div>
      <div className='card-product-info'>
        <div className='card-product-info-name'>{'Coca-cola 350ml'}</div>
        <div className='card-product-info-qty-and-price'>
          <div className='card-product-qty-wrapper'>
            <div className='card-product-info-qty-title'>Estoque:</div>
            <div className='card-product-info-qty'>{'30'}</div>
          </div>

          <div className='card-product-info-price-wrapper'>
            <div className='card-product-info-price-title'>Valor:</div>
            <div className='card-product-info-price'>
              {Number(4.99).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </div>
          </div>
        </div>
        <div className='card-product-btns'>
          <Button id='btn-card-edit'>Editar</Button>
          <Button id='btn-card-delete'>Excluir</Button>
        </div>
      </div>

      <div className='card-product-categories'>
        <div className='card-product-category' key={'3d047b60-ebdf-4cf2-8308-a57fb11c8892'}>
          {'Refrigerantes'}
        </div>
        <div className='card-product-category' key={'42c20acf-ca7a-4f22-bd63-242dd7846a9d'}>
          {'Bebidas'}
        </div>
      </div>
    </div>
  );
}
