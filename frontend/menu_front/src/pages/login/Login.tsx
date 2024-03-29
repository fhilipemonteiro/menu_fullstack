import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { login } from './services/login';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Button from '../../components/button/Button';
import './styles/login.scss';

export function Login() {
  const { setAccessToken, setLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Login | Admin';
  }, []);

  const handleLogin = async () => {
    try {
      const {
        data: { access_token, expires_in },
      } = await login({ email, password });

      await Cookies.set('access_token', access_token, { expires: expires_in });

      await setAccessToken?.(access_token);

      await setLoggedIn?.(true);
      navigate('/products');
    } catch (error) {
      const { status } = Object(error).response;
      if (status === 401) {
        alert('Email ou senha inválida.');
      } else {
        alert('Ocorreu um erro inesperado, tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className='container-parent'>
      <div className='container-form'>
        <div className='form-group'>
          <h1>Login</h1>
          <form className='form-login' onSubmit={handleSubmit(handleLogin)}>
            <input
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Email inválido',
                },
              })}
              type='email'
              name='email'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && <p>{String(errors.email.message)}</p>}
            <input
              {...register('password', { required: 'Senha é obrigatória' })}
              type='password'
              name='password'
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && <p>{String(errors.password.message)}</p>}
            <Button id='btn-login' type='submit'>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
