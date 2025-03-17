import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      stock
      images
      colors
      sizes
      category {
        name
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: String!) {
    product(id: $id) {
      id
      name
      description
      price
      stock
      images
      colors
      sizes
      category {
        name
      }
    }
  }
`;
