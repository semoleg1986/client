import React from 'react';
import { Product } from '../../types';
import Card from '../Card';
import { CardsStyle } from './Cards.styled';

type CardsProps = {
  updateProductList: () => void;
  products: Product[];
  onEditProduct: (product: Product) => void;
};

const Cards: React.FC<CardsProps> = ({ products, onEditProduct, updateProductList  }) => {
    return (
      <CardsStyle>
        {products.map((product) => (
          <Card key={product.id} product={product} onEditProduct={onEditProduct} updateProductList={updateProductList} />
        ))}
      </CardsStyle>
    );
  };
  
  export default Cards;
