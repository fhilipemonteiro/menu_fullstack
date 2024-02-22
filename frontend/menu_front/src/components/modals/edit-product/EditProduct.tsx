import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { IProduct } from '../../../pages/product/interfaces/product';
import { updateProduct } from './services/edit-product';

import Button from '../../button/Button';
import './styles/edit-product.scss';

interface IEditProduct {
  product: IProduct;
  closeModal: () => void;
  forceRender: () => void;
}

export default function EditProduct({ product, closeModal, forceRender }: IEditProduct) {
  const { accessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { id, name, qty, price, photo } = product;

  const [newName, setName] = useState<string>(name);
  const [newQty, setQty] = useState<number>(Number(qty));
  const [newPrice, setPrice] = useState<number>(Number(price));
  const [newPhoto, setPhoto] = useState<string>(photo);

  const newUpdateProduct: Partial<IProduct> = {};

  const validateProduct = () => {
    if (newName !== name && newName.length > 0) {
      newUpdateProduct.name = newName;
    }
    if (newQty !== qty) {
      newUpdateProduct.qty = newQty;
    }
    if (Number(newPrice) !== price) {
      newUpdateProduct.price = newPrice;
    }
    if (newPhoto !== photo && newPhoto.length > 0) {
      newUpdateProduct.photo = newPhoto;
    }
  };

  useEffect(() => {
    validateProduct();
  }, [newName, newQty, newPrice, newPhoto]);

  const handleUpdateProduct = async () => {
    try {
      const response = await updateProduct(id, newUpdateProduct, accessToken);
      forceRender();
      closeModal();
      reset();
      return response;
    } catch (error) {
      const { status } = Object(error).response;

      if (status === 401) {
        alert('Não autorizado.');
        navigate('/auth/login');
      } else {
        alert('Ocorreu um erro inesperado, tente novamente mais tarde.');
      }
    }
  };

  return (
    <form className='container-modal-edit-product' onSubmit={handleSubmit(handleUpdateProduct)}>
      <div className='product-header-container'>
        <div className='product-header-wrapper'>
          <div className='product-header-photo'>
            <img src={photo} alt={name} />
          </div>
          <div className='product-header-details'>
            <div className='prouduct-header-numbers'>
              <div className='product-header-qty-wrapper'>
                <div className='product-header-qty'>Quantidade</div>
                <input
                  type='text'
                  className='qty-input'
                  placeholder={String(product.qty)}
                  onChange={e => setQty(Number(e.target.value))}
                />
              </div>
              <div className='product-header-price-wrapper'>
                <div className='product-header-price'>Preço</div>
                <input
                  type='text'
                  placeholder={Number(product.price).toLocaleString('pt-BR', {
                    currency: 'BRL',
                  })}
                  className='price-input'
                  onChange={e =>
                    setPrice(
                      parseFloat(String(e.target.value).replace(/\./g, '').replace(',', '.')),
                    )
                  }
                />
              </div>
            </div>
            <div className='product-header-categories-wrapper'>
              Não é possivel alterar categoria!
            </div>
          </div>
        </div>
      </div>
      <div className='product-details-container'>
        <div className='product-details-name'>
          <input
            type='text'
            id='product-details-name'
            placeholder={product.name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='product-details-url-photo'>
          <input
            type='text'
            id={errors.photoURL ? 'border-required' : 'product-details-url-photo'}
            {...register('photoURL', {
              pattern: /.*\.com.*/,
            })}
            placeholder='URL da imagem'
            onChange={e => setPhoto(e.target.value)}
          />
        </div>
        {errors.photoURL && <p id='url-invalid'>URL Inválida</p>}
      </div>
      <div className='product-buttons-container'>
        <Button className='btn-product-modal' id='btn-product-modal-save' type='submit'>
          Salvar
        </Button>
        <Button className='btn-product-modal' id='btn-product-modal-cancel' onClick={closeModal}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
