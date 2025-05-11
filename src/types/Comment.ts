export type Comment = {
  id: string;
  content: string;
  rating: number;
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
  };
  createdAt: string;
  userReactionType: "LIKE" | "DISLIKE";
  likes: number;
  dislikes: number;
};

export type GetProductCommentsResponse = {
  getProductComments: Comment[];
};
