import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts(
    $filters: ProductFilter
    $sortBy: ProductSortField
    $page: Int
    $pageSize: Int
  ) {
    products(
      filters: $filters
      sortBy: $sortBy
      page: $page
      pageSize: $pageSize
    ) {
      id
      name
      description
      price
      discountedPrice
      stock
      images
      colors {
        name
        hex
      }
      sizes
      discount
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
      colors {
        name
        hex
      }
      sizes
      category {
        name
      }
    }
  }
`;
