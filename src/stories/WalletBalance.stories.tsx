import type { Meta, StoryObj } from "@storybook/react";
import WalletBalance from "../components/account/WalletBalance";

const meta: Meta<typeof WalletBalance> = {
  title: "Account/WalletBalance",
  component: WalletBalance,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof WalletBalance>;

export const primary: Story = {
  args: {
    balance: 600000,
  },
};
