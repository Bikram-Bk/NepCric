import { storage } from "@/utils/storage";

const WISHLIST_KEY = "wishlist";

export const wishlistService = {
  // Get wishlist from localStorage
  getWishlist: () => {
    return storage.get(WISHLIST_KEY) || [];
  },

  // Save wishlist to localStorage
  saveWishlist: (wishlist) => {
    storage.set(WISHLIST_KEY, wishlist);
    return wishlist;
  },

  // Add item to wishlist
  addToWishlist: (product) => {
    const wishlist = wishlistService.getWishlist();
    const existingItem = wishlist.find((item) => item.id === product.id);

    if (!existingItem) {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
        tag: product.tag,
      });
    }

    return wishlistService.saveWishlist(wishlist);
  },

  // Remove item from wishlist
  removeFromWishlist: (productId) => {
    const wishlist = wishlistService.getWishlist();
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    return wishlistService.saveWishlist(updatedWishlist);
  },

  // Check if item is in wishlist
  isInWishlist: (productId) => {
    const wishlist = wishlistService.getWishlist();
    return wishlist.some((item) => item.id === productId);
  },

  // Clear wishlist
  clearWishlist: () => {
    return wishlistService.saveWishlist([]);
  },

  // Get wishlist count
  getWishlistCount: (wishlist) => {
    return wishlist.length;
  },
};
