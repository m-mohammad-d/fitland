import type { Meta, StoryObj } from "@storybook/react";
import OrderProgressBar from "../components/checkout/OrderProgressBar";

const meta: Meta<typeof OrderProgressBar> = {
  title: "checkout/OrderProgressBar",
  component: OrderProgressBar,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof OrderProgressBar>;

export const StepOne: Story = {
  args: {
    currentStep: 1,
  },
};

export const StepTwo: Story = {
  args: {
    currentStep: 2,
  },
};

export const StepThree: Story = {
  args: {
    currentStep: 3,
  },
};

export const StepFour: Story = {
  
  args: {
    currentStep: 4,
  },
};
