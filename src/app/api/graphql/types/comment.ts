export type AddCommentArgs = {
  content: string;
  rating: number;
  productId: string;
};

export type UpdateCommentArgs = {
  commentId: string;
  content: string;
  rating: number;
};
