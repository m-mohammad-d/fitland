import type { Meta, StoryObj } from "@storybook/react";
import Input from "../components/ui/Input";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: "ui/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered", 
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "نام خود را وارد کنید",
  },
};

export const WithLabel: Story = {
  args: {
    label: "نام کامل",
    placeholder: "علی رضایی",
  },
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Input fullWidth label="ایمیل" placeholder="email@example.com" />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    label: "شماره تلفن",
    placeholder: "0912...",
    errorMessage: "شماره معتبر نیست",
  },
};

export const Disabled: Story = {
  args: {
    label: "ایمیل",
    placeholder: "غیرفعال",
    disabled: true,
  },
};

const PasswordInput = () => {
  const [value, setValue] = useState("");
  return <Input label="رمز عبور" type="password" placeholder="********" value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Password: Story = {
  render: () => <PasswordInput />,
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="سایز 32 (کوچک)" size={32} placeholder="متن کوچک" />
      <Input label="سایز 40 (متوسط)" size={40} placeholder="متن متوسط" />
      <Input label="سایز 48 (بزرگ)" size={48} placeholder="متن بزرگ" />
      <Input label="سایز 56 (خیلی بزرگ)" size={56} placeholder="متن خیلی بزرگ" />
    </div>
  ),
};

export const CustomStyle: Story = {
  args: {
    label: "استایل سفارشی",
    placeholder: "با رنگ پس‌زمینه خاص",
    className: "bg-yellow-50 border-yellow-300",
  },
};
