import type { Meta, StoryObj } from "@storybook/react";
import BenefitsSection from "../components/home/BenefitsSection";

const meta: Meta<typeof BenefitsSection> = {
  title: "UI/BenefitsSection",
  component: BenefitsSection,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BenefitsSection>;

export const primary: Story = {
  args: {
    product: {
      id: "6dc3eb05-8665-4b00-a283-a85f77c5c1bb",
      name: "Nike Running Shoes",
      description: "Comfortable running shoes",
      price: 120,
      stock: 50,
      images: ["nike1.jpg", "nike2.jpg"],
      colors: ["Black", "White"],
      sizes: ["40", "41", "42"],
      category: {
        name: "Accessories",
        __typename: "Category",
      },
      __typename: "Product",
    },
  },
};
