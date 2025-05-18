import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "../components/ui/DropDown";
import { useState } from "react";

const meta: Meta<typeof Dropdown> = {
  title: "ui/DropDown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return <Dropdown value={value} onChange={setValue} options={["گزینه اول", "گزینه دوم", "گزینه سوم"]} />;
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState("گزینه دوم");
    return <Dropdown value={value} onChange={setValue} options={["گزینه اول", "گزینه دوم", "گزینه سوم"]} />;
  },
};

export const WithManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return <Dropdown value={value} onChange={setValue} options={["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴", "گزینه ۵", "گزینه ۶", "گزینه ۷", "گزینه ۸", "گزینه ۹", "گزینه ۱۰"]} />;
  },
};
