export type Wallet = {
  id: string;
  userId: string;
  balance: number;
  createdAt: number;
  updatedAt: string;
  transactions: {
    id: string;
    amount: number;
    transactionType: string;
    createdAt: number;
  }[];
};

export type GraphQLFetchGetWalletResponse = {
  data: {
    getUserWalletInfo: Wallet;
  };
};
