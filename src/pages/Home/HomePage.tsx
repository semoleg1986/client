import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Product } from '../../types';
import { GET_PRODUCTS } from '../../graphql/mutation';
import Form from '../../components/Form/Form';
import Cards from '../../components/Cards';

import { Modal, ModalContent } from '../../components/Modal/Modal.styled';
import { Overlay } from '../../components/Overlay/Overlay.styled';
import { CloseButton } from '../../components/Buttons/Buttons.styled';
import { FormContainer } from '../../components/Form/Form.styled';
import { Button } from '../../components/Form/Form.styled';


const Home = (): JSX.Element => {
  const { loading, error, data, refetch } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const updateProductList = () => {
    refetch();
  };

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const handleEditProduct = (product: Product | null) => {
    setSelectedProduct(product); // Установка выбранного продукта
    setFormOpen(true); // Открытие формы
  };

  let formModal = null;
  if (isFormOpen) {
    formModal = (
      <Modal>
        <Overlay onClick={closeForm} />
        <ModalContent>
          <CloseButton onClick={closeForm}>&times;</CloseButton>
          <FormContainer>
          <Form updateProductList={updateProductList} handleEditProduct={handleEditProduct} selectedProduct={selectedProduct} />
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

      <Cards products={data?.products || []} onEditProduct={handleEditProduct} />
    </>
  );
};

export default Home;