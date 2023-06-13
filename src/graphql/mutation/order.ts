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

export const UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $address: String!
    $name: String!
    $orderId: ID!
    $phoneNumber: String!
    $status: String!
    $surname: String!
  ) {
    updateOrder(
      address: $address
      name: $name
      orderId: $orderId
      status: $status
      surname: $surname
    ) {
      order {
        id
        receiptNumber
        status
      }
    }
  }
`;

export const GET_STATUSES = gql`
  query {
    statuses
  }
`;

export const UPDATE_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: String!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      status
    }
  }
`;
