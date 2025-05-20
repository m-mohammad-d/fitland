import { gql } from "@apollo/client";

export const GET_USER_LISTS = gql`
  query GetUserLists {
    getUserLists {
      id
      title
      createdAt
      products {
        id
        addedAt
        product {
          id
          name
          price
          discountedPrice
          images
        }
      }
    }
  }
`;

export const GET_LIST_BY_ID = gql`
  query GetListById($id: ID!) {
    getListById(id: $id) {
      id
      title
      createdAt
      products {
        id
        addedAt
        product {
          id
          name
          price
          discountedPrice
          images
          sizes
          colors {
            name
            hex
          }
        }
      }
    }
  }
`;

export const CREATE_LIST = gql`
  mutation CreateList($title: String!) {
    createList(title: $title) {
      id
      title
      createdAt
    }
  }
`;

export const UPDATE_LIST = gql`
  mutation UpdateList($id: ID!, $title: String!) {
    updateList(id: $id, title: $title) {
      id
      title
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      id
    }
  }
`;

export const ADD_PRODUCT_TO_LIST = gql`
  mutation AddProductToList($listId: ID!, $productId: ID!) {
    addProductToList(listId: $listId, productId: $productId) {
      id
      product {
        id
        name
        price
        discountedPrice
        images
      }
    }
  }
`;

export const REMOVE_PRODUCT_FROM_LIST = gql`
  mutation RemoveProductFromList($listId: ID!, $productId: ID!) {
    removeProductFromList(listId: $listId, productId: $productId) {
      id
    }
  }
`;
