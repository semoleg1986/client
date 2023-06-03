import React from 'react'
import { Product } from '../../types';
import { CardStyle } from './Card.styled';
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT, EDIT_PRODUCT } from "../../graphql/mutation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CardProps = {
  product: Product;
  updateProductList: () => void;
  onEditProduct: (product: Product) => void;
};

const Card: React.FC<CardProps> = ({ product, onEditProduct, updateProductList  }) => {

  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct({
        variables: {
          id: product.id,
        }
      });
      toast.success("Product deleted", { autoClose: 2000, toastId: "success-toast" });
      updateProductList();
      // console.log("Product deleted")
    } catch (error) {
      toast.error("Error deleting product", { autoClose: 2000, toastId: "error-toast" });
      // console.error("Error deleting product")
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
      <button className="delete-product-button" onClick={handleDeleteProduct}>🗑</button>
      <button className="edit-product-button" onClick={handleEditProduct}>✎</button>
    </CardStyle>
    
    </div>
  );
};

export default Card
