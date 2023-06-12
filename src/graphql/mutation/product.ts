import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $sellerId: ID!
    $name: String!
    $description: String!
    $price: Decimal!
    $quantity: Int!
    $categoryId: ID!
  ) {
    createProduct(
      sellerId: $sellerId
      name: $name
      description: $description
      price: $price
      quantity: $quantity
      categoryId: $categoryId
    ) {
      product {
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
      category {
        name
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $name: String!
    $description: String!
    $price: Decimal!
    $quantity: Int!
    $categoryId: ID!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      quantity: $quantity
      categoryId: $categoryId
    ) {
      product {
        id
        name
        description
        price
        quantity
        category {
          id
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_SELLER_ID = gql`
  query ($sellerId: ID!) {
    productsBySellerId(sellerId: $sellerId) {
      id
      name
      description
      price
      quantity
      category {
        id
        name
      }
      seller {
        id
      }
    }
  }
`;
