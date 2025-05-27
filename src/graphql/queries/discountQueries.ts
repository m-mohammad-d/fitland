import gql from "graphql-tag";

export const GET_ALL_DISCOUNT_CODES = gql`
  query getAllDiscountCodes {
    getAllDiscountCodes {
      id
      code
      value
      type
      isActive
    }
  }
`;

export const GET_DISCOUNT_CODE_BY_ID = gql`
  query GetDiscountCodeById($id: ID!) {
    getDiscountCodeById(id: $id) {
      id
      code
      type
      value
      isActive
    }
  }
`;
