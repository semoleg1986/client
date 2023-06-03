import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $description: String!
    $price: Decimal!
    $quantity: Int!
  ) {
    createProduct(
        name: $name
        description: $description
        price: $price
        quantity: $quantity
    ) { product {
        id
    }
    }
  }
`;


export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      price
      quantity
    }
  }
`;

export const DELETE_PRODUCT = gql`
mutation deleteProduct(
  $id: ID!
) {
  deleteProduct(
    id: $id
  ) {
    success
  }
}`

export const EDIT_PRODUCT = gql`
mutation updateProduct(
  $id: ID!
  $name: String!
  $description: String!
  $price: Decimal!
  $quantity: Int!
) {
  updateProduct(
    id: $id
    name: $name
    description: $description
    price: $price
    quantity: $quantity
  ) { product {
    id
    name
    description
    price
    quantity
  }}
}`
