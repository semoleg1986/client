import { useQuery, useMutation, gql } from '@apollo/client';
import { Product } from '../../types';
import { useState } from 'react';
import { CREATE_PRODUCT } from '../../graphql/mutation';

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

const Home = (): JSX.Element => {
  const { loading, error, data, refetch } = useQuery<{ products: Product[] }>(GET_PRODUCTS);

  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductQuantity, setNewProductQuantity] = useState(0);

  const [createProduct, err] = useMutation(CREATE_PRODUCT);

  const handleCreateProduct = async () => {
    console.log(newProductName)
    await createProduct({
      variables: {
        name: newProductName,
        description: newProductDescription,
        price: newProductPrice,
        quantity: newProductQuantity,
      },
    });
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
        <input
          type="text"
          placeholder="Product Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Description"
          value={newProductDescription}
          onChange={(e) => setNewProductDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Product Quantity"
          value={newProductQuantity}
          onChange={(e) => setNewProductQuantity(Number(e.target.value))}
        />
        <button onClick={handleCreateProduct}>createProduct</button>
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
