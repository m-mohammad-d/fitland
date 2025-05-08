import gql from "graphql-tag";

export const ADD_ADDRESS = gql`
  mutation addAddress(
    $fullName: String!
    $phone: String!
    $fullAddress: String!
    $plaque: String!
    $unit: String
    $zipCode: String!
    $details: String
  ) {
    addAddress(
      input: {
        fullName: $fullName
        phone: $phone
        fullAddress: $fullAddress
        plaque: $plaque
        unit: $unit
        zipCode: $zipCode
        details: $details
      }
    ) {
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
