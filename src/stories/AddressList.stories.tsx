import type { Meta, StoryObj } from "@storybook/react";
import AddressList from "../components/checkout/AddressList";

const meta: Meta<typeof AddressList> = {
  title: "checkout/AddressList",
  component: AddressList,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AddressList>;

export const primary: Story = {
  args: {
    addresses: [
      {
        id: "cmafdhner0001i5fxzyqm6ls9",
        userId: "52775b34-b667-4814-95e9-5fe1a61ae953",
        fullName: "رضا هاشمی",
        phone: "0913894756",
        fullAddress: "ایران,  استان تهران, شهرستان تهران, بخش مرکزی شهرستان تهران, شهر تهران, شهرداری منطقه شش ناحیه یک, منطقه ۱۱ شهر تهران, حر, چهار راه کمالی, خیابان امام خمینی",
        plaque: "12",
        unit: "3",
        zipCode: "1234567896",
        details: "لطفا زنگ نزنید",
        createdAt: "1746709084612",
        updatedAt: "1746709084612",
        __typename: "Address",
      },
      {
        id: "cmafdhner0001i5fxzyqm6ls9",
        userId: "52775b34-b667-4814-95e9-5fe1a61ae953",
        fullName: "رضا هاشمی",
        phone: "0913894756",
        fullAddress: "ایران,  استان تهران, شهرستان تهران, بخش مرکزی شهرستان تهران, شهر تهران, شهرداری منطقه شش ناحیه یک, منطقه ۱۱ شهر تهران, حر, چهار راه کمالی, خیابان امام خمینی",
        plaque: "12",
        unit: "3",
        zipCode: "1234567896",
        details: "لطفا زنگ نزنید",
        createdAt: "1746709084612",
        updatedAt: "1746709084612",
        __typename: "Address",
      },
    ],
  },
};
