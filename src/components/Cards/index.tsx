import React from 'react';
import { Product } from '../../types';
import Card from '../Card';
import { CardsStyle } from './Cards.styled';

type CardsProps = {
  products: Product[];
  onDelete: (id: string) => void;
  
};

const Cards: React.FC<CardsProps> = ({ products, onDelete }) => {
    return (
      <CardsStyle>
        {products.map((product) => (
          <Card key={product.id} product={product} onDelete={onDelete} />
        ))}
      </CardsStyle>
    );
  };
  
  export default Cards;
