import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import RatingStars from "./RatingStars";
import { ThumbsUp, Edit, Trash2, CheckCircle } from "lucide-react";
import { formatters } from "@/utils/formatters";

const ReviewItem = ({ review, onEdit, onDelete, onHelpful }) => {
  const { user } = useAuth();
  const [isHelpfulLoading, setIsHelpfulLoading] = useState(false);
  const isOwner =
    user?.id === review.userId || user?.email === review.userEmail;

  const handleHelpful = async () => {
    setIsHelpfulLoading(true);
    await onHelpful(review.id);
    setIsHelpfulLoading(false);
  };

  return (
    <div className="py-4 border-b border-[#D0C9BA] last:border-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
            style={{ backgroundColor: "#EDE8DE", color: "#1C1A17" }}
          >
            {review.userName?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p
              className="text-sm font-medium"
              style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
            >
              {review.userName}
            </p>
            <div className="flex items-center gap-2">
              <RatingStars rating={review.rating} size={14} />
              <span
                className="text-xs"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                {formatters.date(review.createdAt)}
              </span>
              {review.isVerified && (
                <span
                  className="text-[10px] font-medium flex items-center gap-0.5"
                  style={{ color: "#22c55e" }}
                >
                  <CheckCircle size={12} />
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {isOwner && (
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(review)}
              className="p-1.5 rounded-full transition-colors hover:bg-[#EDE8DE]"
              title="Edit review"
            >
              <Edit size={14} style={{ color: "#7A7468" }} />
            </button>
            <button
              onClick={() => onDelete(review.id)}
              className="p-1.5 rounded-full transition-colors hover:bg-[#EDE8DE]"
              title="Delete review"
            >
              <Trash2 size={14} style={{ color: "#7A7468" }} />
            </button>
          </div>
        )}
      </div>

      {/* Comment */}
      <p
        className="text-sm mt-2"
        style={{
          color: "#7A7468",
          fontFamily: "Outfit, sans-serif",
          lineHeight: "1.6",
        }}
      >
        {review.comment}
      </p>

      {/* Helpful Button */}
      <button
        onClick={handleHelpful}
        disabled={isHelpfulLoading}
        className="flex items-center gap-1.5 mt-3 text-xs transition-colors hover:opacity-60"
        style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
      >
        <ThumbsUp size={12} />
        <span>Helpful ({review.helpful || 0})</span>
      </button>
    </div>
  );
};

export default ReviewItem;
