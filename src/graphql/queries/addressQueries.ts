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
