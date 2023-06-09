import { gql } from "@apollo/client";

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