import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface CommentRatingProps {
  rating: number;
}

function CommentRating({ rating }: CommentRatingProps) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="h-4 w-4 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="h-4 w-4 text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="h-4 w-4 text-yellow-400" />);
      }
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {renderStars()}
      </div>
      <span className="text-xs font-medium text-gray-600 sm:text-sm">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default CommentRating; 