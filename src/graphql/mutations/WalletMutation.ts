import { gql } from "@apollo/client";

export const WALLET_DEPOSIT = gql`
  mutation walletDeposit($amount: Int!) {
    walletDeposit(amount: $amount) {
      id
    }
  }
`;

export const WALLET_WITHDRAW = gql`
  mutation walletWithdraw($amount: Int!) {
    walletWithdraw(amount: $amount) {
      id
    }
  }
`;
