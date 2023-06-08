import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $description: String!
    $price: Decimal!
    $quantity: Int!
    $categoryId: ID!
  ) {
    createProduct(
        name: $name
        description: $description
        price: $price
        quantity: $quantity
        categoryId: $categoryId
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
      category{
        name
      }
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
  $categoryId: ID!
) {
  updateProduct(
    id: $id
    name: $name
    description: $description
    price: $price
    quantity: $quantity
    categoryId: $categoryId
  ) { product {
    id
    name
    description
    price
    quantity
    category {
      id
    }
  }}
}`;

export const GET_CATEGORIES = gql`
query {
  categories {
    id
    name
  }
}
`;

export const CREATE_CATEGORY = gql`
mutation createCategory(
  $name: String!
  ){
  createCategory(
  name: $name
  ) { category {
    name
  }
 }
}`;

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $name: String!
    $surname: String!
    $phoneNumber: String!
    $address: String!
    $email: String!
    $productIds: [ID!]!
    $quantities: [Int!]!
  ) {
    createOrder(
      name: $name
      surname: $surname
      phoneNumber: $phoneNumber
      address: $address
      email: $email
      productIds: $productIds
      quantities: $quantities
    ) {
      order{
      name
      surname
      phoneNumber
      products {
        id
        name
        price
        quantity
      }
      }
    }
  }
`;

export const GET_ORDER =gql`
query {
  orders {
    receiptNumber
    name
    surname
    phoneNumber
    address
    email
    status
    orderitemSet {
      product {
        name
        price
      }
    }
  }
}
`;

export const CREATE_USER = gql`
mutation CreateUser(
  $email: String!
  $password: String!
  $username: String!
) {
  createUser(
    email: $email
    password: $password
    username: $username
  ) {
    user {
      username
    }
  }
}
`;