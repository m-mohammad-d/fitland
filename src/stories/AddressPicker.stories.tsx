import type { Meta, StoryObj } from "@storybook/react";
import AddressPicker from "../components/checkout/AddressPicker";

const meta: Meta<typeof AddressPicker> = {
  title: "checkout/AddressPicker",
  component: AddressPicker,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AddressPicker>;

export const primary: Story = {
  args: {
    onLocationSelect(address) {
      console.log(address);
    },
  },
};
