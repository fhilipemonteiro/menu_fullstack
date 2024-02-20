import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { getCategories } from './services/get-categories';
import { createProduct } from './services/post-product';

import Button from '../../button/Button';
import { MdNoPhotography } from 'react-icons/md';
import './styles/new-product.scss';

interface IProduct {
  closeModal: () => void;
  forceRender: () => void;
}

interface SubCategory {
  id: string;
  name: string;
  categories: SubCategory[];
}

export default function NewProduct({ closeModal, forceRender }: IProduct) {
  const { accessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [photo, setPhoto] = useState<string>('');
  const [categories, setCategories] = useState<SubCategory[]>([]);
  const [mainCategoryID, setMainCategoryID] = useState<string>('');
  const [subCategoryID, setSubCategoryID] = useState<string>('');
  const [subCategories, setSubCategories] = useState<{ id: string; name: string }[]>([]);

  const product = {
    name,
    price,
    qty,
    photo,
    categories: [
      {
        id: mainCategoryID,
      },
    ],
  };

  if (subCategoryID) {
    product.categories.push({ id: subCategoryID });
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getCategories(accessToken);
        setCategories(categoriesData);
      } catch (error) {
        alert('Ocorreu um erro inesperado, tente novamente mais tarde.');
      }
    }
    fetchCategories();
  }, []);

  const handleSetSubCategory = (mainCategory: string) => {
    if (!mainCategory) {
      return [];
    }

    const selectedCategory = categories.find(
      (category: SubCategory) => category.id === mainCategory,
    );

    if (!selectedCategory) {
      return [];
    }

    return selectedCategory.categories.map((subCategory: SubCategory) => ({
      id: subCategory.id,
      name: subCategory.name,
    }));
  };

  const handleSetCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMainCategoryID(e.target.value);
    setSubCategoryID('');
    setSubCategories(handleSetSubCategory(e.target.value));
  };

  const handleCreateProduct = async () => {
    try {
      const response = await createProduct(product, accessToken);
      closeModal();
      forceRender();
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
    <form className='container-modal-new-product' onSubmit={handleSubmit(handleCreateProduct)}>
      <div className='product-header-container'>
        <div className='product-header-wrapper'>
          <div className='product-header-photo'>
            {photo ? <img src={String(photo)} alt='' /> : <MdNoPhotography id='icon-image' />}
          </div>
          <div className='product-header-details'>
            <div className='prouduct-header-numbers'>
              <div className='product-header-qty-wrapper'>
                <div className='product-header-qty'>Quantidade</div>
                <input
                  type='text'
                  className='qty-input'
                  id={errors.qtyProduct && 'border-required'}
                  {...register('qtyProduct', { required: true })}
                  onChange={e => setQty(Number(e.target.value))}
                />
              </div>
              <div className='product-header-price-wrapper'>
                <div className='product-header-price'>Preço</div>
                <input
                  type='text'
                  id={errors.qtyProduct && 'border-required'}
                  className='price-input'
                  {...register('priceProduct', { required: true })}
                  onChange={e =>
                    setPrice(
                      parseFloat(String(e.target.value).replace(/\./g, '').replace(',', '.')),
                    )
                  }
                />
              </div>
            </div>
            <div className='product-header-categories-wrapper'>
              <div className='select-main-category-wrapper'>
                <p>Categoria Principal</p>
                <select
                  id={errors.mainCategory ? 'border-required' : ''}
                  {...register('mainCategory', {
                    required: true,
                    validate: (value: string) => value !== '',
                  })}
                  onChange={e => handleSetCategory(e)}>
                  <option disabled selected value={''}>
                    Selecione
                  </option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='select-sub-category-wrapper'>
                <p>Sub Categoria</p>

                <select
                  id={errors.subCategory ? 'border-required' : ''}
                  {...register('subCategory', {
                    required: subCategories.length > 0,
                    validate: (value: string) => value !== '',
                  })}
                  onChange={e => setSubCategoryID(e.target.value)}>
                  {subCategories.length === 0 && (
                    <>
                      <option disabled selected value={''}>
                        -
                      </option>
                    </>
                  )}
                  {subCategories.length > 0 && (
                    <>
                      <option disabled selected>
                        Selecione
                      </option>
                      {subCategories.map(subCategory => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {subCategory.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='product-details-container'>
        <div className='product-details-name'>
          <input
            type='text'
            id={errors.nameProduct ? 'border-required' : 'product-details-name'}
            {...register('nameProduct', { required: true })}
            placeholder='Nome do produto'
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='product-details-url-photo'>
          <input
            type='text'
            id={errors.photoURL ? 'border-required' : 'product-details-url-photo'}
            {...register('photoURL', {
              required: true,
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
