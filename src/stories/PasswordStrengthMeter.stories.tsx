import type { Meta, StoryObj } from "@storybook/react";
import type { PasswordStrength } from "@/lib/passwordStrength";
import { PasswordStrengthMeter } from "@/components/ui/PasswordStrengthMeter";

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: "ui/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PasswordStrengthMeter>;

export const Weak: Story = {
  args: {
    strength: {
      score: 1,
      message: "ضعیف",
    } satisfies PasswordStrength,
  },
};

export const Medium: Story = {
  args: {
    strength: {
      score: 3,
      message: "متوسط",
    } satisfies PasswordStrength,
  },
};

export const Strong: Story = {
  args: {
    strength: {
      score: 5,
      message: "قوی",
    } satisfies PasswordStrength,
  },
};
