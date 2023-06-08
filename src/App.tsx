import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Crud from './pages/Crud';
import Home from './pages/Home';
import Stock from './pages/Stock';
import NotFoundPage from './pages/404/NotFoundPage';
import Layout from './components/Layout';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import { ROOT_PAGE, NOT_FOUND_PAGE, STOCK_PAGE, ORDER_PAGE, CRUD_PAGE, ORDER_DETAILS_PAGE } from './routes';
import Order from './pages/Order';
import OrderDetails from './pages/Order/orderDetails';

const App = () => {
  const router = createBrowserRouter([
    {
      path: ROOT_PAGE,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },{
          path: CRUD_PAGE,
          element: <Crud />
        },{
          path: STOCK_PAGE,
          element: <Stock />,
        },{
          path: ORDER_PAGE,
          element: <Order />,
        },{
          path: ORDER_DETAILS_PAGE,
          element: <OrderDetails />,
        },{
          path: NOT_FOUND_PAGE,
          element: <NotFoundPage />,
        } 
      ]
    }
  ])

  return (
    <ApolloProvider client={client}>
        <RouterProvider router={router} />
    </ApolloProvider>
  );
};
export default App;