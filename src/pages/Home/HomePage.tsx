import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Product } from '../../types';
import { GET_PRODUCTS, DELETE_PRODUCT_MUTATION } from '../../graphql/mutation';
import Form from '../../components/Form/Form';
import Cards from '../../components/Cards';

import { Modal, ModalContent } from '../../components/Modal/Modal.styled';
import { Overlay } from '../../components/Overlay/Overlay.styled';
import { CloseButton } from '../../components/Buttons/Buttons.styled';
import { FormContainer } from '../../components/Form/Form.styled';
import { Button } from '../../components/Buttons/Buttons.styled';


const Home = (): JSX.Element => {
  const { loading, error, data, refetch } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  const [isFormOpen, setFormOpen] = useState(false);
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);

  const updateProductList = () => {
    refetch();
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({
        variables: {
          id: id    
        },
      });    
    updateProductList();
    } catch(error){
      console.log(error)
    }
  };

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  let formModal = null;
  if (isFormOpen) {
    formModal = (
      <Modal>
        <Overlay onClick={closeForm} />
        <ModalContent>
          <CloseButton onClick={closeForm}>&times;</CloseButton>
          <FormContainer>
            <Form updateProductList={updateProductList} />
          </FormContainer>
        </ModalContent>
      </Modal>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div>
        <Button onClick={openForm}>Add Product</Button>
      </div>

      {formModal}

      <Cards products={data?.products || []} onDelete={handleDelete} />
    </>
  );
};

export default Home;
