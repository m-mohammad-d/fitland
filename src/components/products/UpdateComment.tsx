import { useMutation } from "@apollo/client";
import Modal from "../ui/Modal";
import { CommentForm } from "./CommentForm";
import { UPDATE_COMMENT } from "@/graphql/mutations/CommentMutation";
import { Comment } from "@/types/Comment";
import { useRouter } from "next/navigation";

interface UpdateCommentProps {
  isOpen: boolean;
  onClose: () => void;
  comment: Comment;
}

function UpdateComment({ isOpen, onClose, comment }: UpdateCommentProps) {
  const router = useRouter();
  const [updateProductComment, { loading }] = useMutation(UPDATE_COMMENT);

  const updateProductCommentHandler = async ({ content, rating }: { content: string; rating: number }) => {
    try {
      await updateProductComment({
        variables: {
          commentId: comment.id,
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
      <CommentForm
        onSubmit={updateProductCommentHandler}
        loading={loading}
        defaultValues={{
          content: comment.content,
          rating: comment.rating,
        }}
        onCancel={onClose}
      />
    </Modal>
  );
}

export default UpdateComment;
