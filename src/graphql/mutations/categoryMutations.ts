import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation addCategory($name: String!) {
    addCategory(name: $name) {
      name
    }
  }
`;
export const UPDATE_CATEGORY = gql`
  mutation updateCategory($input: updateCategoryInput!) {
    updateCategory(input: $input) {
      name
    }
  }
`;
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;
