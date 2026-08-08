import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      toast.success("Welcome back! 👋");
      return { success: true, user: response.user };
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      toast.success("Account created successfully! 🎉");
      return { success: true, user: response.user };
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Logout function - Clear everything
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    // ✅ Double-check storage is cleared
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      toast.success(response.message || "Password reset link sent!");
      return { success: true, message: response.message };
    } catch (error) {
      toast.error(error.message || "Failed to send reset link.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword) => {
    setIsLoading(true);
    try {
      const response = await authService.resetPassword(token, newPassword);
      toast.success(response.message || "Password reset successfully!");
      return { success: true, message: response.message };
    } catch (error) {
      toast.error(error.message || "Failed to reset password.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (userData) => {
    setIsLoading(true);
    try {
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
      return { success: true, user: updatedUser };
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
