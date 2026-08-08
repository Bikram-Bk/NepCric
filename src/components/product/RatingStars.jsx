import { Star } from "lucide-react";

const RatingStars = ({
  rating,
  maxRating = 5,
  size = 16,
  interactive = false,
  onRatingChange,
}) => {
  const handleClick = (index) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(maxRating)].map((_, index) => (
        <button
          key={index}
          type="button"
          className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
          onClick={() => handleClick(index)}
          disabled={!interactive}
        >
          <Star
            size={size}
            className={
              index < rating
                ? "fill-[#C4954A] text-[#C4954A]"
                : "fill-gray-200 text-gray-200"
            }
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
