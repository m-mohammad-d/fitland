import { gql } from "graphql-tag";

export const GET_USER_ADDRESS = gql`
  query getUserAddress {
    getUserAddress {
      id
      userId
      province
      city
      street
      alley
      plaque
      unit
      zipCode
      createdAt
      updatedAt
    }
  }
`;

export const GET_ADDRESS_BY_ID = gql`
  query GetAddressById($id: String) {
    getAddressById(id: $id) {
      id
      province
      userId
      city
      street
      alley
      plaque
      unit
      zipCode
      createdAt
      updatedAt
    }
  }
`;
