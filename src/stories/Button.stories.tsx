import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/ui/Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const primary: Story = {
  args: {
    variant: "fill",
    children: "Click me",
    disabled: false,
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    variant: "outline",
    children: "Click me",
    disabled: false,
    size: "medium",
  },
};

export const Disabled: Story = {
  args: {
    variant: "fill",
    children: "Disabled Button",
    disabled: true,
  },
};

export const SmallButton: Story = {
  args: {
    variant: "fill",
    children: "Small Button",
    size: "small",
    disabled: false,
  },
};

export const LargeButton: Story = {
  args: {
    variant: "fill",
    children: "Large Button",
    size: "large",
    disabled: false,
  },
};
