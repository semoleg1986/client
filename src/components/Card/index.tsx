import React from 'react'
import { Product } from '../../types';
import { CardStyle } from './Card.styled';
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT, EDIT_PRODUCT } from "../../graphql/mutation";

type CardProps = {
  product: Product;
  onEditProduct: (product: Product) => void;
};

const Card: React.FC<CardProps> = ({ product, onEditProduct  }) => {

  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct({
        variables: {
          id: product.id,
        }
      });
      console.log("Product deleted")
    } catch (error) {
      console.error("Error deleting product")
    }
  };

  const handleEditProduct = () => {
    onEditProduct(product);
  };

  return (
    <CardStyle key={product.id}>
      <h5>{product.name}</h5>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <button className="delete-product-button" onClick={handleDeleteProduct}>🗑</button>
      <button className="edit-product-button" onClick={handleEditProduct}>✎</button>
    </CardStyle>
  );
};

export default Card
