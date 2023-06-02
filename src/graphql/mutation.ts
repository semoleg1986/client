import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
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

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
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