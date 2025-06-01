import { useMutation } from "@apollo/client";
import Modal from "../ui/Modal";
import { CommentForm } from "./CommentForm";
import { ADD_COMMENT } from "@/graphql/mutations/CommentMutation";
import { useRouter } from "next/navigation";
function AddComment({ isOpen, onClose, productId }: { isOpen: boolean; onClose: () => void; productId: string }) {
  const router = useRouter();
  const [createProductComment, { loading }] = useMutation(ADD_COMMENT);

  const createProductCommentHandler = async ({ content, rating }: { content: string; rating: number }) => {
    try {
      await createProductComment({
        variables: {
          productId,
          content,
          rating,
        },
      });
      onClose();
      router.refresh();
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
