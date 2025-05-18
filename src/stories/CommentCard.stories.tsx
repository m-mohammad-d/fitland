import type { Meta, StoryObj } from "@storybook/react";
import CommentCard from "../components/products/CommentCard";

const meta: Meta<typeof CommentCard> = {
  title: "products/CommentCard",
  component: CommentCard,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CommentCard>;

export const UserReactedWithLike: Story = {
  args: {
    comment: {
      id: "4e0a22e7-4f6f-4ca5-9cb8-506753b8121a",
      content: "این محصول بسیار عالی است",
      rating: 0,
      user: {
        id: "52775b34-b667-4814-95e9-5fe1a61ae953",
        name: "silvershade1000@gmail.com",
        email: "silvershade1000@gmail.com",
        photo: "https://res.cloudinary.com/do4d27dp8/image/upload/v1746455626/image_uq6xumj44.png",
      },
      createdAt: "1746890952886",
      userReactionType: "LIKE",
      likes: 1240,
      dislikes: 56,
    },
  },
};
export const UserReactedWithDislike: Story = {
  args: {
    comment: {
      id: "4e0a22e7-4f6f-4ca5-9cb8-506753b8121a",
      content: "این محصول بسیار عالی است",
      rating: 0,
      user: {
        id: "52775b34-b667-4814-95e9-5fe1a61ae953",
        name: "silvershade1000@gmail.com",
        email: "silvershade1000@gmail.com",
        photo: "https://res.cloudinary.com/do4d27dp8/image/upload/v1746455626/image_uq6xumj44.png",
      },
      createdAt: "1746890952886",
      userReactionType: "DISLIKE",
      likes: 453,
      dislikes: 56,
    },
  },
};

export const NoReaction: Story = {
  args: {
    comment: {
      id: "4e0a22e7-4f6f-4ca5-9cb8-506753b8121a",
      content: "این محصول بسیار عالی است",
      rating: 0,
      user: {
        id: "52775b34-b667-4814-95e9-5fe1a61ae953",
        name: "silvershade1000@gmail.com",
        email: "silvershade1000@gmail.com",
        photo: "https://res.cloudinary.com/do4d27dp8/image/upload/v1746455626/image_uq6xumj44.png",
      },
      createdAt: "1746890952886",
      likes: 453,
      dislikes: 56,
    },
  },
};
