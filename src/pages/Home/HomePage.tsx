import { useQuery } from '@apollo/client';
import { Product } from '../../types';
import { GET_PRODUCTS } from '../../GraphQL/Mutations';
import Form from '../../components/Form';


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
      {data?.products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
    </>
  );
};

export default Home;