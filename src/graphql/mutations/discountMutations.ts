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

export const UPDATE_DISCOUNT_STATUS = gql`
  mutation updateDiscountCode($input: updateDiscountCodeInput!) {
    updateDiscountCode(input: $input) {
      id
      isActive
    }
  }
`;
