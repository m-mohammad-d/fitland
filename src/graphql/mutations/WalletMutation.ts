import { gql } from "@apollo/client";

export const WALLET_DEPOSIT = gql`
  mutation walletDeposit($amount: Int!) {
    walletDeposit(amount: $amount) {
      id
    }
  }
`;
