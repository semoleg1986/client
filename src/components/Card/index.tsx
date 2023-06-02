import React from 'react'
import { Product } from '../../types';
import { CardStyle } from './Card.styled';

type CardProps = {
  product: Product;
};

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <CardStyle key={product.id}>
      <h5>{product.name}</h5>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
    </CardStyle>
  );
};

export default Card
