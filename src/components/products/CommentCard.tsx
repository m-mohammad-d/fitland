import { LIKE_COMMENT } from "@/graphql/mutations/ReactionMutation";
import { formatJalaliDate } from "@/lib/Date";
import { Comment } from "@/types/Comment";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";
import { GET_ME } from "@/graphql/queries/userQueries";
import { ApolloGetUserResponse } from "@/types/User";
import UpdateComment from "./UpdateComment";
import CommentActions from "./CommentActions";
import CommentReactions from "./CommentReactions";
import CommentRating from "./CommentRating";
import { BsDot } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi";
import { RiUserLine } from "react-icons/ri";

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);
  const [dislikes, setDislikes] = useState(comment.dislikes || 0);
  const [userReaction, setUserReaction] = useState<"LIKE" | "DISLIKE" | undefined>(comment.userReactionType);
  const [loadingType, setLoadingType] = useState<"LIKE" | "DISLIKE" | null>(null);
  const [showUpdateComment, setShowUpdateComment] = useState(false);
  
  const { data: getMe } = useQuery<ApolloGetUserResponse>(GET_ME);
  const [likeComment] = useMutation(LIKE_COMMENT);

  const isCommentOwner = comment.user?.id === getMe?.getMe.id;

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
        setUserReaction(undefined);
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

  return (
    <div className="w-full rounded-xl border border-neutral-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md md:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="flex flex-shrink-0 items-start gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
            {comment.user?.photo ? (
              <Image 
                src={comment.user.photo} 
                alt={comment.user.name} 
                fill
                className="object-cover" 
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-400">
                <RiUserLine className="h-6 w-6" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-medium text-gray-900">
                  {comment.user?.name || "ناشناس"}
                </h4>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <BsDot className="h-4 w-4" />
                  <div className="flex items-center gap-1">
                    <HiOutlineClock className="h-4 w-4" />
                    <span>{formatJalaliDate(comment.createdAt)}</span>
                  </div>
                </div>
              </div>
              <CommentRating rating={comment.rating} />
            </div>
            
            {isCommentOwner && (
              <CommentActions 
                onEdit={() => setShowUpdateComment(true)} 
              />
            )}
          </div>

          <div className="mb-4">
            <p 
              className={`text-sm text-gray-700 sm:text-base ${expanded ? "" : "line-clamp-3"} cursor-pointer`} 
              onClick={() => setExpanded(!expanded)}
            >
              {comment.content}
            </p>
            {comment.content.length > 100 && (
              <button 
                onClick={() => setExpanded(!expanded)} 
                className="mt-1 text-sm font-medium text-primary-600 hover:text-primary-700 focus:outline-none"
              >
                {expanded ? "نمایش کمتر" : "نمایش بیشتر"}
              </button>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <CommentReactions
              likes={likes}
              dislikes={dislikes}
              userReaction={userReaction}
              loadingType={loadingType}
              onReaction={handleReaction}
            />
          </div>
        </div>
      </div>

      <UpdateComment 
        isOpen={showUpdateComment} 
        onClose={() => setShowUpdateComment(false)} 
        comment={comment} 
      />
    </div>
  );
}

export default CommentCard;
