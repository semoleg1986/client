import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Stock from './pages/Stock';
import NotFoundPage from './pages/404/NotFoundPage';
import Layout from './components/Layout';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import { ROOT_PAGE, NOT_FOUND_PAGE, STOCK_PAGE } from './routes';

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
          path: STOCK_PAGE,
          element: <Stock />,
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