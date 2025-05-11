import gql from "graphql-tag";

export const ADD_COMMENT = gql`
  mutation AddComment($productId: ID!, $content: String!, $rating: Int!) {
    addComment(productId: $productId, content: $content, rating: $rating) {
      id
    }
  }
`;
