import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { login } from './services/login';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './styles/login.scss';
import { isTokenValid } from '../../utils/token-validation';
import Button from '../../components/button/Button';

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
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      const {
        data: { access_token, expires_in },
      } = await login({ email, password });

      await setToken(access_token);

      await Cookies.set('access_token', access_token, { expires: expires_in });

      console.log(isTokenValid());

      if (token && setAccessToken) {
        await setAccessToken(token);
      }

      if (setLoggedIn) {
        await setLoggedIn(true);
      }
      navigate('/product');
    } catch (error) {
      const { status } = Object(error).response;
      console.log(status);

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
