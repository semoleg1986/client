import styled from 'styled-components';

interface CartWrapperProps {
  isVisible: boolean;
}

export const CartWrapper = styled.div<CartWrapperProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #f2f2f2;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isVisible }) => (isVisible ? 'translateX(0)' : 'translateX(100%)')};
  z-index: 999;
`;
