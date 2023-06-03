import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Product } from '../../types';
import { GET_PRODUCTS } from '../../graphql/mutation';
import { CardsStyle } from '../../components/Cards/Cards.styled';
import { CardStyle } from '../../components/Card/Card.styled';

const Stock = () => {
  const { loading, error, data, refetch } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.product.id === product.id);
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedItems = cartItems.filter((item) => item.product.id !== productId);
    setCartItems(updatedItems);
  };

  return (
    <>
      <CardsStyle>
        {data?.products.map((product) => (
          <CardStyle key={product.id}>
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </CardStyle>
        ))}
      </CardsStyle>

      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product.id}>
              <h5>{item.product.name}</h5>
              <p>Price: ${item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Stock;
