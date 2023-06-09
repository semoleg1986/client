import React, { useState, useContext, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../graphql/mutation/auth';
import { AuthContext } from '../../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROOT_PAGE } from '../../../routes';

interface LoginData {
  // Define the shape of the login data object
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data: any) => {
      // Обработка успешной авторизации
      console.log(data);
      // Установка состояния авторизации
      authContext?.setAuthenticated(true);
      // Navigate to the home page
      navigate(ROOT_PAGE);
    },
    onError: (error: any) => {
      // Обработка ошибки авторизации
      console.error(error);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const loginData: LoginData = {
      username,
      password,
    };

    // Вызов мутации для авторизации пользователя
    loginUser({ variables: loginData });
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
