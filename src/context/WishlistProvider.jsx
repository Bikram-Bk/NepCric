import { useState, useEffect } from "react";
import WishlistContext from "./WishlistContext";
import { wishlistService } from "@/services/wishlistService";
import toast from "react-hot-toast";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  // Load wishlist on mount
  useEffect(() => {
    const savedWishlist = wishlistService.getWishlist();
    setWishlist(savedWishlist);
    setItemCount(savedWishlist.length);
  }, []);

  // Add item to wishlist
  const addToWishlist = (product) => {
    setIsLoading(true);
    try {
      const updatedWishlist = wishlistService.addToWishlist(product);
      setWishlist(updatedWishlist);
      setItemCount(updatedWishlist.length);
      toast.success(`${product.name} added to wishlist! ❤️`);
      return { success: true };
    } catch (error) {
      toast.error("Failed to add item to wishlist.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    try {
      const updatedWishlist = wishlistService.removeFromWishlist(productId);
      setWishlist(updatedWishlist);
      setItemCount(updatedWishlist.length);
      toast.success("Item removed from wishlist.");
      return { success: true };
    } catch (error) {
      toast.error("Failed to remove item from wishlist.");
      return { success: false, error: error.message };
    }
  };

  // Toggle wishlist (add/remove)
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      return removeFromWishlist(product.id);
    } else {
      return addToWishlist(product);
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistService.isInWishlist(productId);
  };

  // Clear wishlist
  const clearWishlist = () => {
    try {
      const updatedWishlist = wishlistService.clearWishlist();
      setWishlist(updatedWishlist);
      setItemCount(0);
      toast.success("Wishlist cleared.");
      return { success: true };
    } catch (error) {
      toast.error("Failed to clear wishlist.");
      return { success: false, error: error.message };
    }
  };

  const value = {
    wishlist,
    isLoading,
    itemCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
