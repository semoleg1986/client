import React, { useState, useContext, FormEvent, useEffect } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
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
  const client = useApolloClient();

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data: any) => {
      console.log(data);
      authContext?.setAuthenticated(true);
      navigate(ROOT_PAGE);
      client.writeQuery({
        query: LOGIN_USER,
        data: {
          loginUser: {
            token: data.loginUser.token,
            user: {
              id: data.loginUser.user.id,
              username: data.loginUser.user.username,
              sellerProfile: {
                id: data.loginUser.user.sellerProfile.id,
                companyName: data.loginUser.user.sellerProfile.companyName,
              }
            },
          },
        },
      });
      const { token, ...userData } = data.loginUser;

      localStorage.setItem('authData', JSON.stringify({ token }));
      localStorage.setItem('userData', JSON.stringify(userData));
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  //     проверка токена, что-то не работает
  // useEffect(() => {
  //   const authData = localStorage.getItem('authData');
  //   if (authData) {
  //     const { token } = JSON.parse(authData);
  //     if (token) {
  //       authContext?.setAuthenticated(true);
  //     }
  //   }
  // }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const loginData: LoginData = {
      username,
      password,
    };
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
