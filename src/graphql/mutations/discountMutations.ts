import gql from "graphql-tag";

export const APPLY_DISCOUNT = gql`
  mutation ApplyDiscount($code: String!, $totalPrice: Float!) {
    applyDiscount(code: $code, totalPrice: $totalPrice) {
      success
      message
      discountAmount
      discountPercent
      type
      code
    }
  }
`;
