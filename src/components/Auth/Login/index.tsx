import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../graphql/mutation/auth';
import { useNavigate } from 'react-router-dom';
import { ROOT_PAGE } from '../../../routes';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/authSlice';

interface LoginData {
  username: string;
  password: string;
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUserMutation, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data: any) => {
      const token = data.loginUser.token;
      const idSeller = data.loginUser.user.sellerProfile.id
      dispatch(loginUser({ token, idSeller }));
      navigate(ROOT_PAGE);
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const loginData: LoginData = {
      username,
      password,
    };
    loginUserMutation({ variables: loginData });
  };

  return (
    <div>
      <h1>Страница авторизации</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          Войти
        </button>
        {error && <p>Ошибка авторизации</p>}
      </form>
    </div>
  );
};

export default Login;
