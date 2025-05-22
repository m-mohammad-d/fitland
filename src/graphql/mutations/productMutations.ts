import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $price: Int!
    $stock: Int!
    $images: [String!]!
    $colors: [ColorInput!]!
    $sizes: [String!]!
    $categoryId: ID!
    $brand: String!
    $discount: Float!
  ) {
    addProduct(name: $name, description: $description, price: $price, stock: $stock, images: $images, colors: $colors, sizes: $sizes, categoryId: $categoryId, brand: $brand, discount: $discount) {
      id
      name
      description
      price
      stock
      images
      colors {
        hex
        name
      }
      sizes
      category {
        id
        name
      }
      brand
      discount
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String!
    $description: String!
    $price: Int!
    $stock: Int!
    $images: [String!]!
    $colors: [ColorInput!]!
    $sizes: [String!]!
    $categoryId: ID!
    $brand: String!
    $discount: Float!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      stock: $stock
      images: $images
      colors: $colors
      sizes: $sizes
      categoryId: $categoryId
      brand: $brand
      discount: $discount
    ) {
      id
      name
      description
      price
      stock
      images
      colors {
        hex
        name
      }
      sizes
      category {
        id
        name
      }
      brand
      discount
    }
  }
`;
