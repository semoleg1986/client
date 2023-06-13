import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { IProduct } from '../../types';
import { GET_PRODUCTS_BY_SELLER_ID } from '../../graphql/mutation/product';
import Form from '../../components/Form/Form';
import Cards from '../../components/Cards';
import { Modal, ModalContent } from '../../components/styles/Modal.styled';
import Overlay from '../../components/styles/Overlay.styled';
import { CloseButton } from '../../components/styles/Buttons.styled';
import { FormContainer, Button } from '../../components/styles/Form.styled';
import { RootState } from '../../store';

function Crud(): JSX.Element {
  const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);
  const sellerId = useSelector((state: RootState) => state.auth.idSeller);

  const { loading, error, data, refetch } = useQuery<{ productsBySellerId: IProduct[] }>(
    GET_PRODUCTS_BY_SELLER_ID,
    {
      variables: { sellerId },
    }
  );

  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const updateProductList = () => {
    refetch();
    setFormOpen(false);
  };

  const openForm = () => {
    setFormOpen(true);
  };
  const clearForm = () => {
    setSelectedProduct(null);
  };

  const closeForm = () => {
    setFormOpen(false);
    clearForm();
  };

  const handleEditProduct = (product: IProduct | null) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  let formModal = null;
  if (isFormOpen) {
    formModal = (
      <Modal>
        <Overlay onClick={closeForm} />
        <ModalContent>
          <CloseButton onClick={closeForm}>&times;</CloseButton>
          <FormContainer>
            <Form
              updateProductList={updateProductList}
              handleEditProduct={handleEditProduct}
              selectedProduct={selectedProduct}
            />
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

      {(() => {
        if (data && data.productsBySellerId.length === 0) {
          return <p>У вас еще нет товаров.</p>;
        }
        return (
          <Cards
            products={data?.productsBySellerId || []}
            onEditProduct={handleEditProduct}
            updateProductList={updateProductList}
          />
        );
      })()}
    </>
  );
}

export default Crud;
