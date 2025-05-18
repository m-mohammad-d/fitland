import type { Meta, StoryObj } from "@storybook/react";
import TransactionItem from "../components/account/TransactionItem";

const meta: Meta<typeof TransactionItem> = {
  title: "Account/TransactionItem",
  component: TransactionItem,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TransactionItem>;

export const deposit: Story = {
  args: {
    id: "cma1axogl0001i5pwcco23sea",
    transactionType: "DEPOSIT",
    amount: 500000,
    createdAt: 1745858267157,
  },
};

export const withdraw: Story = {
  args: {
    id: "cma1axogl0001i5pwcco23sea",
    transactionType: "WITHDRAW",
    amount: 500000,
    createdAt: 1745858267157,
  },
};
