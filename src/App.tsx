import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/HomePage';
import NotFoundPage from './pages/404/NotFoundPage';
import Layout from './components/Layout';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql/',
    cache: new InMemoryCache(),
  });
  
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
};
export default App;
