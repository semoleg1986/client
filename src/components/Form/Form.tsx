import React, { useState } from "react";
import { CREATE_PRODUCT_MUTATION } from "../../graphql/mutation";
import { useMutation } from "@apollo/client";
import { FormContainer, Input, Button } from "./Form.styled";

interface FormProps {
  updateProductList: () => void;
}

function Form({ updateProductList } : FormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [createProduct, { error }] = useMutation(CREATE_PRODUCT_MUTATION);
  const parsedQuantity = parseInt(quantity, 10);

  const addProduct = async () => {
    try {
      await createProduct({
        variables: {
          name: name,
          description: description,
          price: price,
          quantity: parsedQuantity,
        },
      });
      updateProductList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      <Button onClick={addProduct}>Create Product</Button>
    </FormContainer>
  );
}

export default Form;
