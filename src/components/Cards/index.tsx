import React from 'react';
import { Product } from '../../types';
import Card from '../Card';
import { CardsStyle } from './Cards.styled';

type CardsProps = {
  products: Product[];
};

const Cards: React.FC<CardsProps> = ({ products }) => {
    return (
      <CardsStyle>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </CardsStyle>
    );
  };
  
  export default Cards;
