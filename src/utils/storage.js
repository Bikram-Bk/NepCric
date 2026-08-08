export const storage = {
  // Get item from localStorage
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting from storage:", error);
      return null;
    }
  },

  // Set item in localStorage
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Error setting in storage:", error);
      return false;
    }
  },

  // Remove item from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing from storage:", error);
      return false;
    }
  },

  // Clear all items
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing storage:", error);
      return false;
    }
  },

  // Get current user
  getUser: () => {
    return storage.get("user");
  },

  // Set current user
  setUser: (user) => {
    return storage.set("user", user);
  },

  // Remove current user
  removeUser: () => {
    return storage.remove("user");
  },

  // Get auth token
  getToken: () => {
    return storage.get("token");
  },

  // Set auth token
  setToken: (token) => {
    return storage.set("token", token);
  },

  // Remove auth token
  removeToken: () => {
    return storage.remove("token");
  },

  clearAuth: () => {
    storage.remove("user");
    storage.remove("token");
  },
};
