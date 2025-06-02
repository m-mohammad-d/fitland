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
      nationalCode
      role
      lastLogin
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
      email
      phone
      nationalCode
      gender
      photo
      role
      createdAt
      updatedAt
    }
  }
`;
