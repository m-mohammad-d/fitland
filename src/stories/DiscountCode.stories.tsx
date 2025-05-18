import type { Meta, StoryObj } from "@storybook/react";
import DiscountCode from "../components/checkout/DiscountCode";

const meta: Meta<typeof DiscountCode> = {
  title: "checkout/DiscountCode",
  component: DiscountCode,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DiscountCode>;

export const primary: Story = {
  args: {},
};
