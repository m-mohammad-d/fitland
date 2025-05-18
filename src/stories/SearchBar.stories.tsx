import SearchBar from "@/components/ui/SearchBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SearchBar> = {
  title: "UI/SearchBar",
  component: SearchBar,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const primary: Story = {
  args: {},
};
