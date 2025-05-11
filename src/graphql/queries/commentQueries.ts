import gql from "graphql-tag";

export const GET_PRODUCT_COMMENTS = gql`
  query GetProductComments($id: ID!) {
    getProductComments(id: $id) {
      id
      content
      rating
      user {
        id
        name
        email
        photo
      }
      createdAt
      userReactionType
      likes
      dislikes
    }
  }
`;
