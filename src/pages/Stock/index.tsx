import { useQuery } from '@apollo/client';
import { Product } from '../../types';
import { GET_PRODUCTS } from '../../graphql/mutation';
import { CardsStyle } from '../../components/Cards/Cards.styled';
import { CardStyle } from '../../components/Card/Card.styled';

const Stock = () => {
    const { loading, error, data, refetch } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
    return (
    <>
      <CardsStyle>
        {data?.products.map((product) => (
              <CardStyle key={product.id}>
              <h5>{product.name}</h5>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </CardStyle>
        ))}
      </CardsStyle>
    </>
    )
}

export default Stock
