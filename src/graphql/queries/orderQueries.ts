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

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: String) {
    getOrderById(id: $id) {
      id
      user {
        id
        name
        email
        phone
        nationalCode
        gender
        photo
        role
        lastLogin
        createdAt
        updatedAt
      }
      items {
        id
        orderId
        product {
          id
          name
          description
          price
          discountedPrice
          stock
          categoryId
          images
          sizes
          discountCode
          discount
          createdAt
          updatedAt
        }
        color
        size
        quantity
        priceAtPurchase
      }
      discountCodeId
      deliveryDate
      paymentMethod
      shippingCost
      tax
      totalPrice
      status
      createdAt
      address {
        id
        userId
        fullName
        phone
        fullAddress
        plaque
        unit
        zipCode
        details
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ALL_ORDERS = gql`
query GetAllOrders {
  getAllOrders {
    id
    user {
      name
      email
      phone
      nationalCode
    }
    deliveryDate
    paymentMethod
    shippingCost
    tax
    totalPrice
    status
    createdAt
    discountCode {
      value
      isActive
      type
      code
    }
    }
  }
`;
