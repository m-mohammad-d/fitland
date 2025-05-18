import type { Meta, StoryObj } from "@storybook/react";
import Header from "../components/layout/Header";

const meta: Meta<typeof Header> = {
  title: "layout/Header",
  component: Header,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const primary: Story = {
  args: {},
};
