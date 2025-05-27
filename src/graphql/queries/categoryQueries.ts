import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
  query getCategoryById($id: ID!) {
    getCategoryById(id: $id) {
      id
      name
    }
  }
`;
