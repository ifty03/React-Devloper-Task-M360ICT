import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating = ({ rating, maxRating = 5 }: StarRatingProps) => {
  const filledStars = Math.floor(rating);
  const hasPartialStar = rating % 1 !== 0;
  const emptyStars = maxRating - filledStars - (hasPartialStar ? 1 : 0);
  const partialStarPercentage = hasPartialStar ? (rating % 1) * 100 : 0;
  return (
    <div className="flex items-center">
      {/* Filled stars */}
      {Array.from({ length: filledStars }).map((_, i) => (
        <Star
          key={`filled-${i}`}
          className="w-5 h-5 text-yellow-400 fill-yellow-400"
        />
      ))}

      {/* Partial star */}
      {hasPartialStar && (
        <div className="relative">
          <Star className="w-5 h-5 text-gray-300 fill-gray-300" />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${partialStarPercentage}%` }}
          >
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-300 fill-gray-300"
        />
      ))}

      <span className="ml-2 text-sm font-medium text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
