import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Crud from './pages/Crud';
import Home from './pages/Home';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import NotFoundPage from './pages/404/NotFoundPage';
import Layout from './components/Layout';
// eslint-disable-next-line import/no-named-as-default
import client from './graphql/client';
import * as routes from './routes';
import Order from './pages/Order';
// import OrderDetails from './pages/Order/orderDetails';

function App() {
  const router = createBrowserRouter([
    {
      path: routes.ROOT_PAGE,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: routes.CRUD_PAGE,
          element: <Crud />,
        },
        {
          path: routes.SIGN_UP,
          element: <Signup />,
        },
        {
          path: routes.SIGN_IN,
          element: <Login />,
        },
        {
          path: routes.ORDER_PAGE,
          element: <Order />,
        },
        // {
        //   path: routes.ORDER_DETAILS_PAGE,
        //   element: <OrderDetails />,
        // },
        {
          path: routes.NOT_FOUND_PAGE,
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
export default App;
