import DotSpinner from "@/components/ui/DotSpinner";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DotSpinner> = {
  title: "UI/DotSpinner",
  component: DotSpinner,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DotSpinner>;

export const primary: Story = {
  args: {},
};
