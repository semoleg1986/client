import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <NavLink to="/">Home</NavLink>
    </header>
  );
};

export default Header;
