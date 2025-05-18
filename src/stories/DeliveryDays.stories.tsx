import type { Meta, StoryObj } from "@storybook/react";
import DeliveryDays from "../components/checkout/DeliveryDays";

const meta: Meta<typeof DeliveryDays> = {
  title: "checkout/DeliveryDays",
  component: DeliveryDays,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DeliveryDays>;

export const primary: Story = {
  args: {
    workingDays: [
      {
        date: "02/31",
        day: "چهارشنبه",
        shippingPrice: 70000,
      },
      {
        date: "03/01",
        day: "پنج‌شنبه",
        shippingPrice: 70000,
      },
      {
        date: "03/03",
        day: "شنبه",
        shippingPrice: 50000,
      },
      {
        date: "03/04",
        day: "یکشنبه",
        shippingPrice: 50000,
      },
      {
        date: "03/05",
        day: "دوشنبه",
        shippingPrice: 50000,
      },
      {
        date: "03/06",
        day: "سه‌شنبه",
        shippingPrice: 50000,
      },
      {
        date: "03/07",
        day: "چهارشنبه",
        shippingPrice: 50000,
      },
    ],
  },
};
