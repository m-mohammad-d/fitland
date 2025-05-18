import type { Meta, StoryObj } from "@storybook/react";
import PaymentMethods from "../components/checkout/PaymentMethods";

const meta: Meta<typeof PaymentMethods> = {
  title: "checkout/PaymentMethods",
  component: PaymentMethods,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PaymentMethods>;

export const primary: Story = {
  args: {},
};
