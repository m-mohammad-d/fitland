import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $price: Float!
    $stock: Int!
    $images: [String!]!
    $colors: [String!]!
    $sizes: [String!]!
    $categoryId: String!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      stock: $stock
      images: $images
      colors: $colors
      sizes: $sizes
      categoryId: $categoryId
    ) {
      id
      name
    }
  }
`;
