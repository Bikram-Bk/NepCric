export const constants = {
  // App Constants
  APP_NAME: "NepCric",
  APP_DESCRIPTION: "Premium Cricket Equipment & Gear in Nepal",

  // Currency
  CURRENCY: "NPR",
  CURRENCY_SYMBOL: "रू",

  // Shipping (in NPR)
  FREE_SHIPPING_THRESHOLD: 25000, // Free shipping on orders over NPR 25,000
  SHIPPING_COST: 999, // NPR 999 shipping
  TAX_RATE: 0.13, // 13% VAT in Nepal

  // Storage Keys
  CART_KEY: "cart",
  WISHLIST_KEY: "wishlist",
  USER_KEY: "user",
  TOKEN_KEY: "token",
  ORDERS_KEY: "orders",

  // Pagination
  PRODUCTS_PER_PAGE: 8,

  // Images
  PLACEHOLDER_IMAGE: "/images/placeholder.jpg",

  // Order Status
  ORDER_STATUS: {
    PENDING: "pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
  },
};
