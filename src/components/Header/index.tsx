import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ROOT_PAGE, STOCK_PAGE, ORDER_PAGE, CRUD_PAGE } from '../../routes';
import { HeaderStyled, CustomNavLink } from './Header.styled';
import { CartButton } from './Header.styled';
import { toggleCart } from '../../store/cartState';
import { logoutUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state: RootState) => state.cartstate.isVisible);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/signin'); // Replace '/login' with the appropriate route
  };
  
  return (
    <HeaderStyled>
      <CustomNavLink to={ROOT_PAGE}>Home</CustomNavLink>
      <CustomNavLink to={CRUD_PAGE}>Crud</CustomNavLink>
      <CustomNavLink to={STOCK_PAGE}>Stock</CustomNavLink>
      <CustomNavLink to={ORDER_PAGE}>Order</CustomNavLink>
      <CartButton onClick={handleToggleCart}>
          <i>&#128722;</i>
          <p>{getTotalQuantity()}</p>
      </CartButton>
      {isAuthenticated && <button onClick={handleLogout}>Log out</button>}
    </HeaderStyled>
  );
};

export default Header;
