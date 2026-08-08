import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { reviewService } from "@/services/reviewService";
import RatingStars from "./RatingStars";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import { MessageSquare } from "lucide-react";

const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    distribution: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load reviews
  useState(() => {
    const loadReviews = () => {
      setIsLoading(true);
      const productReviews = reviewService.getProductReviews(productId);
      setReviews(productReviews);
      setStats(reviewService.getReviewStats(productId));
      setIsLoading(false);
    };
    loadReviews();
  }, [productId]);

  const handleAddReview = async (reviewData) => {
    setIsSubmitting(true);
    try {
      const newReview = reviewService.addReview(productId, {
        ...reviewData,
        userId: user?.id || "guest",
        userName: user?.name || "Anonymous",
        userEmail: user?.email,
        isVerified: !!user,
      });
      setReviews([newReview, ...reviews]);
      setStats(reviewService.getReviewStats(productId));
      setShowForm(false);
    } catch (error) {
      console.error("Failed to add review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleUpdateReview = async (reviewData) => {
    setIsSubmitting(true);
    try {
      const updated = reviewService.updateReview(
        productId,
        editingReview.id,
        reviewData,
      );
      setReviews(reviews.map((r) => (r.id === updated.id ? updated : r)));
      setStats(reviewService.getReviewStats(productId));
      setShowForm(false);
      setEditingReview(null);
    } catch (error) {
      console.error("Failed to update review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        reviewService.deleteReview(productId, reviewId);
        setReviews(reviews.filter((r) => r.id !== reviewId));
        setStats(reviewService.getReviewStats(productId));
      } catch (error) {
        console.error("Failed to delete review:", error);
      }
    }
  };

  const handleHelpful = async (reviewId) => {
    try {
      const updated = reviewService.markHelpful(productId, reviewId);
      setReviews(reviews.map((r) => (r.id === updated.id ? updated : r)));
    } catch (error) {
      console.error("Failed to mark helpful:", error);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-t-[#C4954A] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex items-center gap-3">
          <div
            className="text-3xl font-bold"
            style={{ fontFamily: "Playfair Display, serif", color: "#C4954A" }}
          >
            {stats.average}
          </div>
          <div>
            <RatingStars rating={stats.average} size={18} />
            <p
              className="text-xs mt-1"
              style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
            >
              Based on {stats.total} {stats.total === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>

        {/* Write Review Button */}
        {user && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#C4954A",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-[#EDE8DE] p-6 rounded-sm border border-[#D0C9BA]">
          <h3
            className="text-lg font-bold mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
          >
            {editingReview ? "Edit Review" : "Write a Review"}
          </h3>
          <ReviewForm
            productId={productId}
            review={editingReview}
            onSubmit={editingReview ? handleUpdateReview : handleAddReview}
            onCancel={handleCancelForm}
            isLoading={isSubmitting}
          />
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare
            size={40}
            className="mx-auto mb-3"
            style={{ color: "#C4954A" }}
          />
          <p
            className="text-sm"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              productId={productId}
              onEdit={handleEditReview}
              onDelete={handleDeleteReview}
              onHelpful={handleHelpful}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
