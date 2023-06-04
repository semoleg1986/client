import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ROOT_PAGE, STOCK_PAGE } from '../../routes';
import { HeaderStyled, CustomNavLink } from './Header.styled';

const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  return (
    <HeaderStyled>
      <CustomNavLink to={ROOT_PAGE}>Home</CustomNavLink>
      <CustomNavLink to={STOCK_PAGE}>Stock</CustomNavLink>
      <span>Cart Items: {cartItems.length}</span>
    </HeaderStyled>
  );
};

export default Header;
