import { gql } from "@apollo/client";

export const LIKE_COMMENT= gql`
  mutation likeComment($commentId: ID!, $type: ReactionType!) {
    likeComment(commentId: $commentId, type: $type) {
      id
    }
  }
`;
