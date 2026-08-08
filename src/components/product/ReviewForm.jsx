import { useState } from "react";
import RatingStars from "./RatingStars";

const ReviewForm = ({ review, onSubmit, onCancel, isLoading }) => {
  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (rating === 0) newErrors.rating = "Please select a rating";
    if (!comment.trim()) newErrors.comment = "Please write a review";
    if (comment.length < 10)
      newErrors.comment = "Review must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ rating, comment });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          Your Rating *
        </label>
        <div className="flex items-center gap-4">
          <RatingStars
            rating={rating}
            size={28}
            interactive={true}
            onRatingChange={setRating}
          />
          {rating > 0 && (
            <span
              className="text-sm font-medium"
              style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
            >
              {rating} / 5
            </span>
          )}
        </div>
        {errors.rating && (
          <p className="text-xs mt-1 text-red-500">{errors.rating}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          Your Review *
        </label>
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 resize-none ${
            errors.comment ? "border-red-500" : ""
          }`}
          style={{
            backgroundColor: "#F5F0E8",
            border: errors.comment ? "1px solid #ef4444" : "1px solid #D0C9BA",
            color: "#1C1A17",
            fontFamily: "Outfit, sans-serif",
          }}
          placeholder="Share your experience with this product..."
        />
        <p
          className="text-xs mt-1"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Minimum 10 characters
        </p>
        {errors.comment && (
          <p className="text-xs mt-1 text-red-500">{errors.comment}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "#C4954A",
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          {isLoading ? "Saving..." : review ? "Update Review" : "Submit Review"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-60"
            style={{
              backgroundColor: "#EDE8DE",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
              border: "1px solid #D0C9BA",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
