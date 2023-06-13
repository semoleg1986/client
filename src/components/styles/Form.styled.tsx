import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  z-index: 1001;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

export const Select = styled.select`
  margin-bottom: 10px;
  padding: 5px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: #4caf50;
  margin: 5px;
  color: white;
  border: none;
  cursor: pointer;
`;
