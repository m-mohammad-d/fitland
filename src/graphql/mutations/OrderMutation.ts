import { gql } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      items {
        productId
        quantity
      }
      addressId
      deliveryDate
      paymentMethod
      shippingCost
      tax
      discountCode
      totalPrice
    }
  }
`;
