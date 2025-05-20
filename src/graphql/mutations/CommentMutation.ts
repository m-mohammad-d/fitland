import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation AddComment($productId: ID!, $content: String!, $rating: Int!) {
    addComment(productId: $productId, content: $content, rating: $rating) {
      id
      content
      rating
      createdAt
      user {
        id
        name
        photo
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($commentId: ID!, $content: String!, $rating: Int!) {
    updateComment(commentId: $commentId, content: $content, rating: $rating) {
      id
      content
      rating
      createdAt
      user {
        id
        name
        photo
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      id
    }
  }
`;
