export type Wallet = {
  id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  transactions: {
    id: string;
    amount: number;
    transactionType: string;
    createdAt: string;
  }[];
};

export type GraphQLFetchGetWalletResponse = {
  data: {
    getUserWalletInfo: Wallet;
  };
};
