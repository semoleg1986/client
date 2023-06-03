import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderStyled = styled.header`
  background-color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
`;

export const CustomNavLink = styled(NavLink)`
  color: white;
  margin: 0 10px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    color: lightgray;
    font-weight: bold;
  }

  &.active {
    color: red;
    font-weight: bold;
  }
`;
