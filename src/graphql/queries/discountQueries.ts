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
