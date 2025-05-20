import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface CommentActionsProps {
  onEdit: () => void;
  onDelete?: () => void;
}

function CommentActions({ onEdit, onDelete }: CommentActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onEdit}
        className="text-neutral-500 hover:text-primary-600 transition-colors"
        aria-label="ویرایش نظر"
      >
        <FiEdit2 size={16} />
      </button>
      {onDelete && (
        <button
          onClick={onDelete}
          className="text-neutral-500 hover:text-red-600 transition-colors"
          aria-label="حذف نظر"
        >
          <FiTrash2 size={16} />
        </button>
      )}
    </div>
  );
}

export default CommentActions; 