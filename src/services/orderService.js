import { storage } from "@/utils/storage";

const ORDERS_KEY = "orders";

export const orderService = {
  // Get all orders
  getOrders: () => {
    return storage.get(ORDERS_KEY) || [];
  },

  // Get single order by ID
  getOrder: (orderId) => {
    const orders = orderService.getOrders();
    return orders.find((order) => order.id === orderId);
  },

  // Create new order
  createOrder: (orderData) => {
    const orders = orderService.getOrders();

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const newOrder = {
      id: orderId,
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    storage.set(ORDERS_KEY, orders);

    return newOrder;
  },

  // Update order status
  updateOrderStatus: (orderId, status) => {
    const orders = orderService.getOrders();
    const orderIndex = orders.findIndex((order) => order.id === orderId);

    if (orderIndex === -1) {
      throw new Error("Order not found");
    }

    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    storage.set(ORDERS_KEY, orders);

    return orders[orderIndex];
  },

  // Cancel order
  cancelOrder: (orderId) => {
    return orderService.updateOrderStatus(orderId, "cancelled");
  },

  // Get user orders
  getUserOrders: (userId) => {
    const orders = orderService.getOrders();
    return orders.filter((order) => order.userId === userId);
  },

  // Clear all orders (for testing)
  clearOrders: () => {
    storage.set(ORDERS_KEY, []);
  },
};
