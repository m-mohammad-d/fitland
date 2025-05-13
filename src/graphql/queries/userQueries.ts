import gql from "graphql-tag";

export const GET_ME = gql`
  query getMe {
    getMe {
      id
      name
      email
      photo
      phone
      gender
      role
      lastLogin
      createdAt
      updatedAt
    }
  }
`;
