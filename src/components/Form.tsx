import React, { useState } from "react";
import { CREATE_PRODUCT_MUTATION } from "../graphql/mutation";
import { useMutation } from "@apollo/client";



function Form({ updateProductList }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setquantity] = useState("");

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
    <div>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => {
            setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Quantity"
        onChange={(e) => {
          setquantity(e.target.value);
        }}
      />
      <button onClick={addProduct}>Create Product</button>
    </div>
  );
}

export default Form;