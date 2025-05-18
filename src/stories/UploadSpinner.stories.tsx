import UploadSpinner from "@/components/ui/UploadSpinner";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UploadSpinner> = {
  title: "UI/UploadSpinner",
  component: UploadSpinner,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;

type Story = StoryObj<typeof UploadSpinner>;

export const primary: Story = {
  args: {},
};
