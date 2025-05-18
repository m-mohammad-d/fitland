import type { Meta, StoryObj } from "@storybook/react";
import PromoBar from "../components/layout/PromoBar";

const meta: Meta<typeof PromoBar> = {
  title: "UI/PromoBar",
  component: PromoBar,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PromoBar>;

export const primary: Story = {
  args: {},
};
