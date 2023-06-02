import React from 'react';
import { Product } from '../../types';
import Card from '../Card';

type CardsProps = {
  products: Product[];
};

const Cards: React.FC<CardsProps> = ({ products }) => {
    return (
      <>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </>
    );
  };
  
  export default Cards;
