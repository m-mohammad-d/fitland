import { gql } from "graphql-tag";

export const GET_WALLET_USER = gql`
  query GetUserWalletInfo {
    getUserWalletInfo {
      id
      userId
      balance
      createdAt
      updatedAt
      transactions {
        id
        amount
        transactionType
        createdAt
      }
    }
  }
`;
