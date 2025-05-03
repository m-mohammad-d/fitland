import gql from "graphql-tag";

export const GET_USER_ORDERS = gql`
  query GetUserOrders {
    getUserOrders {
      id
      createdAt
      totalPrice
      items {
        product {
          id
          images
          name
        }
      }
    }
  }
`;


