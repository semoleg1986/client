import { TCardsProps } from '../../types';
import Card from '../Card';
import CardsStyle from '../styles/Cards.styled';

function Cards({ products, onEditProduct, updateProductList }: TCardsProps) {
  return (
    <CardsStyle>
      {products.map((product) => (
        <Card
          key={product.id}
          product={product}
          onEditProduct={onEditProduct}
          updateProductList={updateProductList}
        />
      ))}
    </CardsStyle>
  );
}

export default Cards;
