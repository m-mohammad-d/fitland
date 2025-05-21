import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $description: String!, $price: Int!, $stock: Int!, $images: [String!]!, $colors: [ColorInput!]!, $sizes: [String!]!, $categoryId: ID!) {
    addProduct(name: $name, description: $description, price: $price, stock: $stock, images: $images, colors: $colors, sizes: $sizes, categoryId: $categoryId) {
      id
      name
    }
  }
`;
