import { useState, useEffect } from "react";
import CartContext from "./CartContext";
import { cartService } from "@/services/cartService";
import toast from "react-hot-toast";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Load cart on mount
  useEffect(() => {
    const savedCart = cartService.getCart();
    setCart(savedCart);
    updateTotals(savedCart);
  }, []);

  // Update totals whenever cart changes
  const updateTotals = (cartData) => {
    setTotal(cartService.getCartTotal(cartData));
    setItemCount(cartService.getCartCount(cartData));
  };

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setIsLoading(true);
    try {
      const updatedCart = cartService.addToCart(product, quantity);
      setCart(updatedCart);
      updateTotals(updatedCart);
      toast.success(`${product.name} added to cart! 🛒`);
      return { success: true };
    } catch (error) {
      toast.error("Failed to add item to cart.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    try {
      const updatedCart = cartService.updateQuantity(productId, quantity);
      setCart(updatedCart);
      updateTotals(updatedCart);
      return { success: true };
    } catch (error) {
      toast.error("Failed to update quantity.");
      return { success: false, error: error.message };
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    try {
      const updatedCart = cartService.removeFromCart(productId);
      setCart(updatedCart);
      updateTotals(updatedCart);
      toast.success("Item removed from cart.");
      return { success: true };
    } catch (error) {
      toast.error("Failed to remove item.");
      return { success: false, error: error.message };
    }
  };

  // Clear cart
  const clearCart = () => {
    try {
      const updatedCart = cartService.clearCart();
      setCart(updatedCart);
      updateTotals(updatedCart);
      toast.success("Cart cleared.");
      return { success: true };
    } catch (error) {
      toast.error("Failed to clear cart.");
      return { success: false, error: error.message };
    }
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cartService.isInCart(productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    return cartService.getItemQuantity(productId);
  };

  const value = {
    cart,
    isLoading,
    total,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
