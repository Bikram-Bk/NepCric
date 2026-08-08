// Form validation utilities

export const validators = {
  // Email validation
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return null;
  },

  // Password validation
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return null;
  },

  // Confirm password validation
  confirmPassword: (value, password) => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    return null;
  },

  // Name validation
  name: (value) => {
    if (!value) return "Name is required";
    if (value.length < 2) return "Name must be at least 2 characters";
    return null;
  },

  // Required field validation
  required: (value, fieldName = "This field") => {
    if (!value || value.trim() === "") return `${fieldName} is required`;
    return null;
  },

  // Phone number validation (optional)
  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value.replace(/[^0-9]/g, ""))) {
      return "Please enter a valid phone number";
    }
    return null;
  },
};
