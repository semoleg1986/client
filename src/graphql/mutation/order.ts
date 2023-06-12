import { gql } from '@apollo/client';

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
      order {
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

export const GET_ORDER = gql`
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

export const ORDER_BY_SELLER_ID = gql`
  query ($sellerId: ID!) {
    ordersBySellerId(sellerId: $sellerId) {
      id
      orderNumber
      receiptNumber
      name
      surname
      phoneNumber
      address
      email
      status
      updateDate
      orderitemSet {
        product {
          name
          price
        }
        quantity
      }
    }
  }
`;
