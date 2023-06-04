import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import Cart from '../../components/Cart';
import { Product } from '../../types';
import { GET_PRODUCTS } from '../../graphql/mutation';
import { CardsStyle } from '../../components/Cards/Cards.styled';
import { CardStyle } from '../../components/Card/Card.styled';
import { addToCart } from '../../store/cartSlice';
import { Button } from '../../components/Form/Form.styled';

const Stock = () => {
  const { loading, error, data, refetch } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product: product }));
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
            <Button onClick={() => handleAddToCart(product)}>Add</Button>
          </CardStyle>
        ))}
      </CardsStyle>
      <Cart />
    </>
  );
};

export default Stock;
