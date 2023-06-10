import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Product } from '../../types';
import { GET_PRODUCTS } from '../../graphql/mutation/product';
import Form from '../../components/Form/Form';
import Cards from '../../components/Cards';
import { ToastContainer } from 'react-toastify';
import { Modal, ModalContent } from '../../components/Modal/Modal.styled';
import { Overlay } from '../../components/Overlay/Overlay.styled';
import { CloseButton } from '../../components/Buttons/Buttons.styled';
import { FormContainer } from '../../components/Form/Form.styled';
import { Button } from '../../components/Form/Form.styled';
import { RootState } from '../../store/';


const Crud = (): JSX.Element => {
  const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);
  const { loading, error, data, refetch } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const updateProductList = () => {
    refetch();
    setFormOpen(false);
  };

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    clearForm();
  };

  const clearForm = () => {
    setSelectedProduct(null);
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

  if (!authenticated && !token) {
    return <p>Вы не авторизованы.</p>;
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
        <ToastContainer />
        <Button onClick={openForm}>Add Product</Button>
      </div>

      {formModal}

      <Cards products={data?.products || []} onEditProduct={handleEditProduct} updateProductList={updateProductList}  />
    </>
  );
};

export default Crud;