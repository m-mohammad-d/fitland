import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      id
    }
  }
`;

export const LOGIN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signOut {
    signOut {
      success
    }
  }
`;
