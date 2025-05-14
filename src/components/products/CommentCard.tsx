import { LIKE_COMMENT } from "@/graphql/mutations/ReactionMutation";
import { formatJalaliDate } from "@/lib/Date";
import { Comment } from "@/types/Comment";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);
  const [dislikes, setDislikes] = useState(comment.dislikes || 0);
  const [userReaction, setUserReaction] = useState<"LIKE" | "DISLIKE" | null>(comment.userReactionType);
  const [loadingType, setLoadingType] = useState<"LIKE" | "DISLIKE" | null>(null);

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
    <div className="w-full rounded-xl border border-neutral-100 bg-white p-4 shadow-sm md:p-5">
      <div className="xs:flex-row xs:gap-4 flex flex-col items-start gap-3">
        <div className="xs:block flex flex-shrink-0 items-center gap-3">
          {comment.user?.photo ? (
            <Image src={comment.user.photo} alt={comment.user.name} width={50} height={50} className="xs:w-12 xs:h-12 h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="xs:w-12 xs:h-12 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="xs:h-6 xs:w-6 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          <span className="xs:hidden text-xs text-neutral-400">{formatJalaliDate(comment.createdAt)}</span>
        </div>

        <div className="w-full min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
            <div className="w-full">
              <div className="xs:flex-row xs:items-center xs:gap-2 flex flex-col justify-between">
                <h4 className="xs:text-base truncate text-sm font-medium text-neutral-800">{comment.user?.name || "ناشناس"}</h4>
                <span className="xs:block hidden text-xs whitespace-nowrap text-neutral-400 sm:text-sm">{formatJalaliDate(comment.createdAt)}</span>
              </div>

              <div className="mt-1 flex items-center gap-2">
                {renderStars()}
                <span className="text-xs text-neutral-500 sm:text-sm">{comment.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-3">
            <p className={`text-sm text-neutral-700 sm:text-base ${expanded ? "" : "line-clamp-3"} cursor-pointer`} onClick={toggleExpand}>
              {comment.content}
            </p>
            {comment.content.length > 100 && (
              <button onClick={toggleExpand} className="text-primary-500 hover:text-primary-700 mt-1 text-xs focus:outline-none sm:mt-2 sm:text-sm">
                {expanded ? "نمایش کمتر" : "نمایش بیشتر"}
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center gap-4 sm:mt-4">
            <button
              className={`flex items-center gap-1 transition-colors ${userReaction === "LIKE" ? "text-green-500" : "text-neutral-500 hover:text-green-500"}`}
              onClick={() => handleReaction("LIKE")}
            >
              <FaThumbsUp className="text-sm" />
              <span className="text-xs sm:text-sm">{loadingType === "LIKE" ? <ImSpinner2 className="animate-spin" /> : `(${likes})`}</span>
            </button>

            <button
              className={`flex items-center gap-1 transition-colors ${userReaction === "DISLIKE" ? "text-red-500" : "text-neutral-500 hover:text-red-500"}`}
              onClick={() => handleReaction("DISLIKE")}
            >
              <FaThumbsDown className="text-sm" />
              <span className="text-xs sm:text-sm">{loadingType === "DISLIKE" ? <ImSpinner2 className="animate-spin" /> : `(${dislikes})`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
