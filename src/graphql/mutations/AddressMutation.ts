import gql from "graphql-tag";

export const ADD_ADDRESS = gql`
  mutation addAddress(
    $province: String!
    $city: String!
    $zipCode: String!
    $street: String!
    $alley: String
    $plaque: String
    $unit: String
  ) {
    addAddress(
      input: {
        province: $province
        city: $city
        zipCode: $zipCode
        street: $street
        alley: $alley
        plaque: $plaque
        unit: $unit
      }
    ) {
      id
      userId
      province
      city
      zipCode
      street
      alley
      plaque
      unit
      createdAt
      updatedAt
    }
  }
`;
