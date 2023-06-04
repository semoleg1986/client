import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ROOT_PAGE, STOCK_PAGE } from '../../routes';
import { HeaderStyled, CustomNavLink } from './Header.styled';
import { Button } from '../../components/Form/Form.styled';
import { toggleCart } from '../../store/cartState';

const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state: RootState) => state.cartstate.isVisible);
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };
  return (
    <HeaderStyled>
      <CustomNavLink to={ROOT_PAGE}>Home</CustomNavLink>
      <CustomNavLink to={STOCK_PAGE}>Stock</CustomNavLink>
      <Button onClick={handleToggleCart}>{isCartVisible ? 'Hide Cart' : 'Show Cart'}</Button>
      <span>Cart Items{cartItems.length}</span>
    </HeaderStyled>
  );
};

export default Header;
