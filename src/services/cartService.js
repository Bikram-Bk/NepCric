import { storage } from "@/utils/storage";

const CART_KEY = "cart";

export const cartService = {
  // Get cart from localStorage
  getCart: () => {
    return storage.get(CART_KEY) || [];
  },

  // Save cart to localStorage
  saveCart: (cart) => {
    storage.set(CART_KEY, cart);
    return cart;
  },

  // Add item to cart
  addToCart: (product, quantity = 1) => {
    const cart = cartService.getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity,
        inStock: product.inStock,
      });
    }

    return cartService.saveCart(cart);
  },

  // Update item quantity
  updateQuantity: (productId, quantity) => {
    const cart = cartService.getCart();
    const item = cart.find((item) => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        return cartService.removeFromCart(productId);
      }
      item.quantity = quantity;
    }

    return cartService.saveCart(cart);
  },

  // Remove item from cart
  removeFromCart: (productId) => {
    const cart = cartService.getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    return cartService.saveCart(updatedCart);
  },

  // Clear cart
  clearCart: () => {
    return cartService.saveCart([]);
  },

  // Get cart total
  getCartTotal: (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  // Get cart item count
  getCartCount: (cart) => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Check if item is in cart
  isInCart: (productId) => {
    const cart = cartService.getCart();
    return cart.some((item) => item.id === productId);
  },

  // Get item quantity in cart
  getItemQuantity: (productId) => {
    const cart = cartService.getCart();
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  },
};
