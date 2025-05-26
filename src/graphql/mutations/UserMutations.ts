import gql from "graphql-tag";

export const UPDATE_USER = gql`
  mutation updateUser($id: String!, $name: String, $email: String, $phone: String, $nationalCode: String, $photo: String, $gender: Gender) {
    updateUser(id: $id, name: $name, email: $email, phone: $phone, photo: $photo, nationalCode: $nationalCode, gender: $gender) {
      id
      name
      email
      phone
      nationalCode
      gender
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
