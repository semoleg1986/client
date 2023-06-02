import React from 'react'
import { Product } from '../../types';
import { CardStyle } from './Card.styled';
import { DeleteButton } from '../Buttons/Buttons.styled';

type CardProps = {
  product: Product;
  onDelete: (id: string) => void;
};

const Card: React.FC<CardProps> = ({ product, onDelete }) => {
  const handleDelete = () => {
    onDelete(product.id);
  };
  return (
    <CardStyle key={product.id}>
      <h5>{product.name}</h5>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
    </CardStyle>
  );
};

export default Card
