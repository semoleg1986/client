import React from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { Product } from '../../types';
import CardStyle from './Card.styled';
import { DELETE_PRODUCT } from '../../graphql/mutation/product';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteButton, EditButton } from '../Buttons/Buttons.styled';

type CardProps = {
  product: Product;
  updateProductList: () => void;
  onEditProduct: (product: Product) => void;
};

function Card({ product, onEditProduct, updateProductList }: CardProps) {
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct({
        variables: {
          id: product.id,
        },
      });
      toast.success('Product deleted', { autoClose: 2000, toastId: 'success-toast' });
      updateProductList();
    } catch (error) {
      toast.error('Error deleting product', { autoClose: 2000, toastId: 'error-toast' });
    }
  };

  const handleEditProduct = () => {
    onEditProduct(product);
  };

  return (
    <div>
      <CardStyle key={product.id}>
        <h5>{product.name}</h5>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Category: {product.category.name}</p>

        <DeleteButton onClick={handleDeleteProduct}>DELETE</DeleteButton>
        <EditButton onClick={handleEditProduct}>EDIT</EditButton>
      </CardStyle>
    </div>
  );
}

export default Card;
