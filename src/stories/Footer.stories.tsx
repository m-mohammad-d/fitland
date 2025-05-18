import Footer from "@/components/layout/Footer";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Footer> = {
  title: "layout/Footer",
  component: Footer,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const primary: Story = {
  args: {},
};
