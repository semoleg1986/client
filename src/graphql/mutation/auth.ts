import { gql } from "@apollo/client";

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

export const LOGIN_USER = gql`
  mutation LoginUser(
    $username: String!, 
    $password: String!
  ) {
    loginUser(
      username: $username, 
      password: $password
    ) {
      token
      user {
        id
        username
      }
    }
  }
`;