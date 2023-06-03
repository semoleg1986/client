import { NavLink } from 'react-router-dom';
import { ROOT_PAGE, STOCK_PAGE } from '../../routes';
import { HeaderStyled, CustomNavLink } from './Header.styled';

const Header = () => {
  return (
    <HeaderStyled>
      <CustomNavLink to={ROOT_PAGE}>Home</CustomNavLink>
      <CustomNavLink to={STOCK_PAGE}>Stock</CustomNavLink>
    </HeaderStyled>
  );
};

export default Header;
