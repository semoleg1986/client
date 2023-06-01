import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      price
      quantity
    }
  }
`;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const Home = (): JSX.Element => {
  const { loading, error, data } = useQuery<{ products: Product[] }>(GET_PRODUCTS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
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
