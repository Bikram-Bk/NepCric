import { storage } from "@/utils/storage";

const USER_KEY = "user";
const ADDRESSES_KEY = "addresses";

export const profileService = {
  // Get current user
  getCurrentUser: () => {
    return storage.get(USER_KEY);
  },

  // Update user profile
  updateProfile: (userData) => {
    const currentUser = storage.get(USER_KEY);
    if (!currentUser) {
      throw new Error("User not authenticated.");
    }

    const updatedUser = {
      ...currentUser,
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    storage.set(USER_KEY, updatedUser);
    return updatedUser;
  },

  // Update password
  updatePassword: (oldPassword, newPassword) => {
    const currentUser = storage.get(USER_KEY);
    if (!currentUser) {
      throw new Error("User not authenticated.");
    }

    // In real app, verify old password with server
    // For mock, we'll just update
    const updatedUser = {
      ...currentUser,
      password: newPassword,
      updatedAt: new Date().toISOString(),
    };

    storage.set(USER_KEY, updatedUser);
    return { success: true, message: "Password updated successfully." };
  },

  // Get all addresses
  getAddresses: () => {
    return storage.get(ADDRESSES_KEY) || [];
  },

  // Add address
  addAddress: (address) => {
    const addresses = profileService.getAddresses();
    const newAddress = {
      id: `addr_${Date.now()}`,
      ...address,
      isDefault: addresses.length === 0,
      createdAt: new Date().toISOString(),
    };
    addresses.push(newAddress);
    storage.set(ADDRESSES_KEY, addresses);
    return newAddress;
  },

  // Update address
  updateAddress: (addressId, addressData) => {
    const addresses = profileService.getAddresses();
    const index = addresses.findIndex((addr) => addr.id === addressId);
    if (index === -1) {
      throw new Error("Address not found.");
    }
    addresses[index] = { ...addresses[index], ...addressData };
    storage.set(ADDRESSES_KEY, addresses);
    return addresses[index];
  },

  // Delete address
  deleteAddress: (addressId) => {
    const addresses = profileService.getAddresses();
    const filtered = addresses.filter((addr) => addr.id !== addressId);
    storage.set(ADDRESSES_KEY, filtered);
    return filtered;
  },

  // Set default address
  setDefaultAddress: (addressId) => {
    const addresses = profileService.getAddresses();
    const updated = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));
    storage.set(ADDRESSES_KEY, updated);
    return updated;
  },

  // Upload avatar
  uploadAvatar: (avatarData) => {
    const currentUser = storage.get(USER_KEY);
    if (!currentUser) {
      throw new Error("User not authenticated.");
    }

    // For mock, we'll store base64 or URL
    const updatedUser = {
      ...currentUser,
      avatar: avatarData,
      updatedAt: new Date().toISOString(),
    };

    storage.set(USER_KEY, updatedUser);
    return updatedUser;
  },
};
