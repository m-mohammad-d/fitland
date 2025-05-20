import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";

interface CommentReactionsProps {
  likes: number;
  dislikes: number;
  userReaction?: "LIKE" | "DISLIKE";
  loadingType: "LIKE" | "DISLIKE" | null;
  onReaction: (type: "LIKE" | "DISLIKE") => void;
}

function CommentReactions({ likes, dislikes, userReaction, loadingType, onReaction }: CommentReactionsProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        className={`group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
          userReaction === "LIKE" 
            ? "bg-green-50 text-green-600" 
            : "text-gray-500 hover:bg-gray-50 hover:text-green-600"
        }`}
        onClick={() => onReaction("LIKE")}
        aria-label="پسندیدن"
      >
        {userReaction === "LIKE" ? (
          <FaThumbsUp className="h-4 w-4" />
        ) : (
          <BsHandThumbsUp className="h-4 w-4" />
        )}
        <span className="text-xs sm:text-sm">
          {loadingType === "LIKE" ? (
            <ImSpinner2 className="h-4 w-4 animate-spin" />
          ) : (
            likes > 0 && likes
          )}
        </span>
      </button>

      <button
        className={`group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
          userReaction === "DISLIKE" 
            ? "bg-red-50 text-red-600" 
            : "text-gray-500 hover:bg-gray-50 hover:text-red-600"
        }`}
        onClick={() => onReaction("DISLIKE")}
        aria-label="نپسندیدن"
      >
        {userReaction === "DISLIKE" ? (
          <FaThumbsDown className="h-4 w-4" />
        ) : (
          <BsHandThumbsDown className="h-4 w-4" />
        )}
        <span className="text-xs sm:text-sm">
          {loadingType === "DISLIKE" ? (
            <ImSpinner2 className="h-4 w-4 animate-spin" />
          ) : (
            dislikes > 0 && dislikes
          )}
        </span>
      </button>
    </div>
  );
}

export default CommentReactions; 