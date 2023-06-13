import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { ROOT_PAGE, ORDER_PAGE, CRUD_PAGE } from '../../routes';
import { HeaderStyled, CustomNavLink } from '../styles/Header.styled';
import { logoutUser } from '../../store/authSlice';

function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/signin'); // Replace '/login' with the appropriate route
  };

  return (
    <HeaderStyled>
      <CustomNavLink to={ROOT_PAGE}>Home</CustomNavLink>
      <CustomNavLink to={CRUD_PAGE}>Crud</CustomNavLink>
      <CustomNavLink to={ORDER_PAGE}>Order</CustomNavLink>
      {isAuthenticated && (
        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      )}
    </HeaderStyled>
  );
}

export default Header;
