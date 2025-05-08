import { gql } from "graphql-tag";

export const GET_USER_ADDRESS = gql`
  query getUserAddress {
    getUserAddress {
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
`;
export const GET_ADDRESS_BY_ID = gql`
  query GetAddressById($id: String) {
    getAddressById(id: $id) {
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
`;
