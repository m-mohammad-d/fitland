import { LIKE_COMMENT } from "@/graphql/mutations/ReactionMutation";
import { formatJalaliDate } from "@/lib/Date";
import { Comment } from "@/types/Comment";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);
  const [dislikes, setDislikes] = useState(comment.dislikes || 0);
  const [userReaction, setUserReaction] = useState<"LIKE" | "DISLIKE" | null>(
    comment.userReactionType
  );
  const [loadingType, setLoadingType] = useState<"LIKE" | "DISLIKE" | null>(
    null
  );

  const [likeComment] = useMutation(LIKE_COMMENT);

  const toggleExpand = () => setExpanded(!expanded);

  const handleReaction = async (type: "LIKE" | "DISLIKE") => {
    if (loadingType) return;
    setLoadingType(type);

    try {
      await likeComment({
        variables: {
          commentId: comment.id,
          type,
        },
      });

      if (userReaction === type) {
        if (type === "LIKE") setLikes(likes - 1);
        else setDislikes(dislikes - 1);
        setUserReaction(null);
      } else {
        if (type === "LIKE") {
          setLikes(likes + 1);
          if (userReaction === "DISLIKE") setDislikes(dislikes - 1);
        } else {
          setDislikes(dislikes + 1);
          if (userReaction === "LIKE") setLikes(likes - 1);
        }
        setUserReaction(type);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingType(null);
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(comment.rating);
    const hasHalfStar = comment.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-neutral-100 w-full">
      <div className="flex flex-col xs:flex-row items-start gap-3 xs:gap-4">
        <div className="flex-shrink-0 flex items-center gap-3 xs:block">
          {comment.user?.photo ? (
            <img
              src={comment.user.photo}
              alt={comment.user.name}
              className="w-10 h-10 xs:w-12 xs:h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 xs:h-6 xs:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
          <span className="xs:hidden text-neutral-400 text-xs">
            {formatJalaliDate(comment.createdAt)}
          </span>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
            <div className="w-full">
              <div className="flex flex-col xs:flex-row xs:items-center xs:gap-2 justify-between">
                <h4 className="font-medium text-neutral-800 truncate text-sm xs:text-base">
                  {comment.user?.name || "ناشناس"}
                </h4>
                <span className="hidden xs:block text-neutral-400 text-xs sm:text-sm whitespace-nowrap">
                  {formatJalaliDate(comment.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                {renderStars()}
                <span className="text-neutral-500 text-xs sm:text-sm">
                  {comment.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-3">
            <p
              className={`text-neutral-700 text-sm sm:text-base ${
                expanded ? "" : "line-clamp-3"
              } cursor-pointer`}
              onClick={toggleExpand}
            >
              {comment.content}
            </p>
            {comment.content.length > 100 && (
              <button
                onClick={toggleExpand}
                className="text-primary-500 hover:text-primary-700 text-xs sm:text-sm mt-1 sm:mt-2 focus:outline-none"
              >
                {expanded ? "نمایش کمتر" : "نمایش بیشتر"}
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 mt-3 sm:mt-4">
            <button
              className={`flex items-center gap-1 transition-colors ${
                userReaction === "LIKE"
                  ? "text-green-500"
                  : "text-neutral-500 hover:text-green-500"
              }`}
              onClick={() => handleReaction("LIKE")}
            >
              <FaThumbsUp className="text-sm" />
              <span className="text-xs sm:text-sm">
                {loadingType === "LIKE" ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  `(${likes})`
                )}
              </span>
            </button>

            <button
              className={`flex items-center gap-1 transition-colors ${
                userReaction === "DISLIKE"
                  ? "text-red-500"
                  : "text-neutral-500 hover:text-red-500"
              }`}
              onClick={() => handleReaction("DISLIKE")}
            >
              <FaThumbsDown className="text-sm" />
              <span className="text-xs sm:text-sm">
                {loadingType === "DISLIKE" ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  `(${dislikes})`
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
