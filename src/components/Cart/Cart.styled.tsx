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
export const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

export const TotalRow = styled.tr`
  background-color: #f2f2f2;
`;

export const TotalCell = styled.td`
  padding: 10px;
  text-align: right;
  font-weight: bold;
  max-width: 150px; /* Adjust the max-width as needed */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ButtonP = styled.button`
  padding: 5px 10px;
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
`;

