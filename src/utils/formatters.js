export const formatters = {
  // Format price in NPR
  price: (amount) => {
    // Format with commas for Nepali numbering (e.g., 39,999)
    const formattedAmount = Number(amount).toLocaleString("en-IN");
    return `रू ${formattedAmount}`;
  },

  // Format currency with NPR support
  currency: (amount, currency = "NPR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  },

  // Compact price format (for cards, quick view)
  priceCompact: (amount) => {
    if (amount >= 100000) {
      return `रू ${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `रू ${(amount / 1000).toFixed(1)}K`;
    }
    return `रू ${amount}`;
  },

  // Format date in Nepali style
  date: (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  // Format date with time in Nepali style
  dateTime: (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  // Truncate text
  truncate: (text, length = 100) => {
    if (!text) return "";
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  },

  // Capitalize first letter
  capitalize: (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  // Get initials from name
  getInitials: (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  },

  // Format order status (with Nepali translation option)
  orderStatus: (status) => {
    const statusMap = {
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };
    return statusMap[status] || status;
  },

  // Get status color
  orderStatusColor: (status) => {
    const colorMap = {
      pending: "#f59e0b",
      processing: "#3b82f6",
      shipped: "#8b5cf6",
      delivered: "#22c55e",
      cancelled: "#ef4444",
    };
    return colorMap[status] || "#7A7468";
  },

  // Format phone number (Nepali format)
  phone: (number) => {
    if (!number) return "";
    // Format: +977-XXXXXXXXX or 01-XXXXXXX
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }
    return number;
  },

  // Format address for Nepal
  address: (address) => {
    if (!address) return "";
    // Just return as is, formatting can be customized
    return address;
  },
};
