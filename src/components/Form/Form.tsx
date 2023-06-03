import React, { useState, useEffect } from "react";
import { CREATE_PRODUCT, EDIT_PRODUCT } from "../../graphql/mutation";
import { useMutation } from "@apollo/client";
import { FormContainer, Input, Button } from "./Form.styled";
import { Product } from "../../types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface FormProps {
  updateProductList: () => void;
  handleEditProduct: (product: Product | null) => void;
  selectedProduct: Product | null
}

function Form({ updateProductList, handleEditProduct, selectedProduct } : FormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [createProduct, { error }] = useMutation(CREATE_PRODUCT);
  const [editProduct] = useMutation(EDIT_PRODUCT)

  const parsedQuantity = parseInt(quantity, 10);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price.toString());
      setQuantity(selectedProduct.quantity.toString());
    }
  }, [selectedProduct]);

  const addProduct = async () => {
    try {
      if(selectedProduct) {
      await editProduct({
        variables: {
          id: selectedProduct.id,
          name: name,
          description: description,
          price: price,
          quantity: parsedQuantity,
        },
      });
      handleEditProduct(null);
      toast.success("Product updated succesfully");
      console.log("Product updated succesfully");
    } else {
      await createProduct({
        variables: {
          name: name,
          description: description,
          price: price,
          quantity: parsedQuantity,
        },
      });
      toast.success("Product added succesfully", { autoClose: 2000, toastId: "success-toast" });
      console.log("Product added succesfully")
    }
      updateProductList();
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <FormContainer>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Button onClick={addProduct}>{selectedProduct ? "Update Product" : "Add product"}</Button>
    </FormContainer>
    </div>
  );
}

export default Form;