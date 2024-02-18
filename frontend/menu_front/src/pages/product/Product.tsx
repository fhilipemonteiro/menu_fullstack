import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import { MdAddCircleOutline, MdFilterAlt } from 'react-icons/md';
import './styles/product.scss';

export default function Product(): JSX.Element {
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
            <div className='card-product'></div>
            <div className='card-product'></div>
            <div className='card-product'></div>
            <div className='card-product'></div>
            <div className='card-product'></div>
            <div className='card-product'></div>
            <div className='card-product'></div>
            <div className='card-product'></div>
            <div className='card-product'></div>
            <div className='card-product'></div>
            <div className='card-product'></div>
          </div>
        </div>
      </div>
    </>
  );
}
