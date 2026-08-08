import { storage } from "@/utils/storage";

const REVIEWS_KEY = "product_reviews";

export const reviewService = {
  // Get all reviews for a product
  getProductReviews: (productId) => {
    const allReviews = storage.get(REVIEWS_KEY) || {};
    return allReviews[productId] || [];
  },

  // Get review by ID
  getReview: (productId, reviewId) => {
    const reviews = reviewService.getProductReviews(productId);
    return reviews.find((r) => r.id === reviewId);
  },

  // Add review
  addReview: (productId, reviewData) => {
    const allReviews = storage.get(REVIEWS_KEY) || {};
    const productReviews = allReviews[productId] || [];

    const newReview = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userId: reviewData.userId || "guest",
      userName: reviewData.userName || "Anonymous",
      rating: reviewData.rating,
      comment: reviewData.comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      helpful: 0,
      isVerified: false,
    };

    productReviews.unshift(newReview);
    allReviews[productId] = productReviews;
    storage.set(REVIEWS_KEY, allReviews);

    return newReview;
  },

  // Update review
  updateReview: (productId, reviewId, reviewData) => {
    const allReviews = storage.get(REVIEWS_KEY) || {};
    const productReviews = allReviews[productId] || [];

    const index = productReviews.findIndex((r) => r.id === reviewId);
    if (index === -1) {
      throw new Error("Review not found");
    }

    productReviews[index] = {
      ...productReviews[index],
      rating: reviewData.rating,
      comment: reviewData.comment,
      updatedAt: new Date().toISOString(),
    };

    allReviews[productId] = productReviews;
    storage.set(REVIEWS_KEY, allReviews);

    return productReviews[index];
  },

  // Delete review
  deleteReview: (productId, reviewId) => {
    const allReviews = storage.get(REVIEWS_KEY) || {};
    const productReviews = allReviews[productId] || [];

    const filtered = productReviews.filter((r) => r.id !== reviewId);
    allReviews[productId] = filtered;
    storage.set(REVIEWS_KEY, allReviews);

    return filtered;
  },

  // Mark review as helpful
  markHelpful: (productId, reviewId) => {
    const allReviews = storage.get(REVIEWS_KEY) || {};
    const productReviews = allReviews[productId] || [];

    const index = productReviews.findIndex((r) => r.id === reviewId);
    if (index === -1) {
      throw new Error("Review not found");
    }

    productReviews[index].helpful = (productReviews[index].helpful || 0) + 1;
    allReviews[productId] = productReviews;
    storage.set(REVIEWS_KEY, allReviews);

    return productReviews[index];
  },

  // Get review stats
  getReviewStats: (productId) => {
    const reviews = reviewService.getProductReviews(productId);

    if (reviews.length === 0) {
      return {
        total: 0,
        average: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = Number((sum / total).toFixed(1));

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      distribution[r.rating] = (distribution[r.rating] || 0) + 1;
    });

    return { total, average, distribution };
  },
};
