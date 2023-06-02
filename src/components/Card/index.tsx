import React from 'react'
import { Product } from '../../types';

type CardProps = {
  product: Product;
};

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div key={product.id}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
};

export default Card
