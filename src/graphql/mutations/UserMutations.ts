import gql from "graphql-tag";

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: String!
    $name: String
    $email: String
    $phone: String
    $nationalCode: String
    $gender: Gender
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      phone: $phone
      nationalCode: $nationalCode
      gender: $gender
    ) {
      id
      name
      email
      phone
      nationalCode
      gender
    }
  }
`;
