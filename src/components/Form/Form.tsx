import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { GET_CATEGORIES, CREATE_CATEGORY } from '../../graphql/mutation/category';
import { CREATE_PRODUCT, EDIT_PRODUCT } from '../../graphql/mutation/product';
import { FormContainer, Input, Button, Select } from './Form.styled';
import { Product } from '../../types';
import 'react-toastify/dist/ReactToastify.css';

import { RootState } from '../../store';

interface FormProps {
  updateProductList: () => void;
  handleEditProduct: (product: Product | null) => void;
  selectedProduct: Product | null;
}

function Form({ updateProductList, handleEditProduct, selectedProduct }: FormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newCategory, setNewCategory] = useState('');

  const { data, refetch } = useQuery(GET_CATEGORIES);

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const sellerId = useSelector((state: RootState) => state.auth.idSeller);

  const parsedQuantity = parseInt(quantity, 10);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price.toString());
      setQuantity(selectedProduct.quantity.toString());
      setSelectedCategory(selectedProduct.category.id.toString());
    }
  }, [selectedProduct]);

  const categories = data?.categories || [];
  const addProduct = async () => {
    try {
      if (selectedProduct) {
        await editProduct({
          variables: {
            id: selectedProduct.id,
            name,
            description,
            price,
            quantity: parsedQuantity,
            categoryId: selectedCategory,
          },
        });
        handleEditProduct(null);
        toast.success('Product updated successfully');
        console.log('Product updated successfully');
      } else {
        await createProduct({
          variables: {
            sellerId,
            name,
            description,
            price,
            quantity: parsedQuantity,
            categoryId: selectedCategory,
          },
        });
        toast.success('Product added successfully', { autoClose: 2000, toastId: 'success-toast' });
        console.log('Product added successfully');
      }
      updateProductList();
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
    } catch (err) {
      console.log(err);
    }
  };

  const updateCategoryList = () => {
    refetch();
  };

  const addCategory = async () => {
    try {
      const response = await createCategory({
        variables: {
          name: newCategory,
        },
      });
      const createdCategory = response.data.createCategory.category;
      setSelectedCategory(createdCategory.id);
      toast.success('Category added successfully');
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
        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select category</option>
          <option value="newCategory">Add new category</option>
          {categories.map((category: { id: string; name: string }) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        {selectedCategory === 'newCategory' && (
          <>
            <Input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button
              onClick={() => {
                addCategory();
                updateCategoryList();
              }}
            >
              Add Category
            </Button>
          </>
        )}
        {selectedCategory !== 'newCategory' && (
          <Button onClick={addProduct}>{selectedProduct ? 'Update Product' : 'Add product'}</Button>
        )}
      </FormContainer>
    </div>
  );
}

export default Form;
