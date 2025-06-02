import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "../components/products/ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "UI/ProductCard",
  component: ProductCard,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const primary: Story = {
  args: {
    product: {
      id: "6dc3eb05-8665-4b00-a283-a85f77c5c1bb",
      name: "Nike Running Shoes",
      description: "Comfortable running shoes",
      price: 120,
      stock: 50,
      images: ["nike1.jpg", "nike2.jpg"],
      colors: [
        { name: "سیاه", hex: "#000000" },
        { name: "سفید", hex: "#fffffff" },
      ],
      sizes: ["40", "41", "42"],
      category: {
        id: "23",
        name: "Accessories",
      },
      __typename: "Product",
      categoryId: "",
      brand: "",
      discountedPrice : 120,
      discount: 0,
      comments: [],
      orderItems: [],
      createdAt: "",
      updatedAt: ""
    },
  },
};
