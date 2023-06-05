import React, { useState, useEffect } from "react";
import { CREATE_PRODUCT, EDIT_PRODUCT, GET_CATEGORIES,CREATE_CATEGORY } from "../../graphql/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { FormContainer, Input, Button, Select } from "./Form.styled";
import { Product } from "../../types";
import { toast } from 'react-toastify';
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
  const [category, setCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState("");

  const { data, refetch } = useQuery(GET_CATEGORIES);

  const [createProduct, { error }] = useMutation(CREATE_PRODUCT);
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [createCategory] = useMutation (CREATE_CATEGORY);

  const parsedQuantity = parseInt(quantity, 10);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price.toString());
      setQuantity(selectedProduct.quantity.toString());
      setCategory(selectedProduct.category.name.toString());
    }
  }, [selectedProduct]);

  const categories = data?.categories || [];

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
          category: category,
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
          categoryId: category,
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

  const updateCategoryList = () => {
    refetch();
  }

  const addCategory = async () => {
    try {
      const response = await createCategory({
        variables: {
          name: newCategory,
        },
      });
      const createdCategory = response.data.createCategory.category;
      setCategory(createdCategory.id);
      toast.success("Category added succesfully");
    } catch (error) {
      console.log(error);
    }
  }

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
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          <option value="newCategory">Добавить новую категорию</option>
          {categories.map((category: { id: string, name: string }) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        {category === "newCategory" && (
          <>
            <Input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={() => { addCategory(); updateCategoryList(); }}>Add Category</Button>
          </>
        )}
      <Button onClick={addProduct}>{selectedProduct ? "Update Product" : "Add product"}</Button>
    </FormContainer>
    </div>
  );
}

export default Form;