import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation createProductMutation($name: String!, $description: String!, $price: Float!, $quantity: Int!) {
    createProduct(
      name: $name,
      description: $description,
      price: $price,
      quantity: $quantity
    ) {
      product {
        id
        name
        description
        price
        quantity
      }
    }
  }
`;