import styled from 'styled-components';

const CardStyle = styled.div`
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  text-align: center;
  transition: box-shadow 0.3s ease-in-out;

  h5 {
    margin: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: cornflowerblue;
    font-style: italic;
  }
`;

export default CardStyle;
