import { useQuery } from '@apollo/client';
import { Product } from '../../types';
import { GET_PRODUCTS } from '../..//graphql/mutation';
import Form from '../../components/Form';
import Cards from '../../components/Cards';

const Home = (): JSX.Element => {
  const { loading, error, data, refetch } = useQuery<{ products: Product[] }>(GET_PRODUCTS);

  const updateProductList = () => {
    refetch(); // Перезагрузка данных после добавления товара
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
    <div>
      < Form updateProductList={updateProductList} />
    </div>
    <Cards products={data?.products || []} />
    </>
  );
};

export default Home;