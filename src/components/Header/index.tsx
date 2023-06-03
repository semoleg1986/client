import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ROOT_PAGE, STOCK_PAGE } from '../../routes';
const Header = () => {
  return (
    <header>
      <NavLink to={ROOT_PAGE}>Home</NavLink>
      <NavLink to={STOCK_PAGE}>Stock</NavLink>
    </header>
  );
};

export default Header;
