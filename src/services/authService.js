import { storage } from "@/utils/storage";

// Mock user database
const MOCK_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
];

// Simulate API delay
const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  // Login user
  login: async (email, password) => {
    await delay();

    const user = MOCK_USERS.find((u) => u.email === email);

    if (!user) {
      throw new Error("User not found. Please check your email.");
    }

    if (user.password !== password) {
      throw new Error("Invalid password. Please try again.");
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = `mock-jwt-token-${Date.now()}`;

    // ✅ Save to storage
    storage.setUser(userWithoutPassword);
    storage.setToken(token);

    return {
      user: userWithoutPassword,
      token,
    };
  },

  // Register new user
  register: async (userData) => {
    await delay();

    const { name, email, password } = userData;

    const existingUser = MOCK_USERS.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    const newUser = {
      id: MOCK_USERS.length + 1,
      name,
      email,
      password,
      role: "user",
    };

    MOCK_USERS.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    const token = `mock-jwt-token-${Date.now()}`;

    // ✅ Save to storage
    storage.setUser(userWithoutPassword);
    storage.setToken(token);

    return {
      user: userWithoutPassword,
      token,
    };
  },

  // ✅ Logout user - Clear ALL auth data
  logout: () => {
    storage.removeUser();
    storage.removeToken();
    // Also clear any other auth-related items
    storage.remove("user");
    storage.remove("token");
    return true;
  },

  // Forgot password
  forgotPassword: async (email) => {
    await delay();

    const user = MOCK_USERS.find((u) => u.email === email);
    if (!user) {
      throw new Error("User not found with this email.");
    }

    return {
      message: "Password reset link sent to your email.",
      email,
    };
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    await delay();
    return {
      message: "Password reset successfully.",
    };
  },

  // Get current user
  getCurrentUser: () => {
    return storage.getUser();
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const user = storage.getUser();
    const token = storage.getToken();
    return !!(user && token);
  },

  // Update user profile
  updateProfile: async (userData) => {
    await delay();

    const currentUser = storage.getUser();
    if (!currentUser) {
      throw new Error("User not authenticated.");
    }

    const userIndex = MOCK_USERS.findIndex((u) => u.id === currentUser.id);
    if (userIndex === -1) {
      throw new Error("User not found.");
    }

    const updatedUser = {
      ...MOCK_USERS[userIndex],
      ...userData,
    };

    MOCK_USERS[userIndex] = updatedUser;

    const { password: _, ...userWithoutPassword } = updatedUser;
    storage.setUser(userWithoutPassword);

    return userWithoutPassword;
  },
};
