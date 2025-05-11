import { useMutation } from "@apollo/client";
import Modal from "../ui/Modal";
import { CommentForm } from "./CommentForm";
import { ADD_COMMENT } from "@/graphql/mutations/CommentMutation";

function AddComment({
  isOpen,
  onClose,
  productId,
}: {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}) {
  const [createProductComment, { loading, error }] = useMutation(ADD_COMMENT);

  const createProductCommentHandler = async ({
    text,
    rating,
  }: {
    text: string;
    rating: number;
  }) => {
    try {
      await createProductComment({
        variables: {
          productId,
          content: text,
          rating,
        },
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CommentForm onSubmit={createProductCommentHandler} loading={loading} />
    </Modal>
  );
}

export default AddComment;
