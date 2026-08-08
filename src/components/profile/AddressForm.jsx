import { useState } from "react";

const AddressForm = ({ address, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    label: address?.label || "Home",
    firstName: address?.firstName || "",
    lastName: address?.lastName || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    zipCode: address?.zipCode || "",
    country: address?.country || "US",
    isDefault: address?.isDefault || false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          Address Label
        </label>
        <select
          name="label"
          value={formData.label}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
          style={{
            backgroundColor: "#F5F0E8",
            border: "1px solid #D0C9BA",
            color: "#1C1A17",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
          >
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
              errors.firstName ? "border-red-500" : ""
            }`}
            style={{
              backgroundColor: "#F5F0E8",
              border: errors.firstName
                ? "1px solid #ef4444"
                : "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          />
          {errors.firstName && (
            <p className="text-xs mt-1 text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
          >
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
              errors.lastName ? "border-red-500" : ""
            }`}
            style={{
              backgroundColor: "#F5F0E8",
              border: errors.lastName
                ? "1px solid #ef4444"
                : "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          />
          {errors.lastName && (
            <p className="text-xs mt-1 text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          Street Address *
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
            errors.address ? "border-red-500" : ""
          }`}
          style={{
            backgroundColor: "#F5F0E8",
            border: errors.address ? "1px solid #ef4444" : "1px solid #D0C9BA",
            color: "#1C1A17",
            fontFamily: "Outfit, sans-serif",
          }}
        />
        {errors.address && (
          <p className="text-xs mt-1 text-red-500">{errors.address}</p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="col-span-1">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
          >
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
              errors.city ? "border-red-500" : ""
            }`}
            style={{
              backgroundColor: "#F5F0E8",
              border: errors.city ? "1px solid #ef4444" : "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          />
          {errors.city && (
            <p className="text-xs mt-1 text-red-500">{errors.city}</p>
          )}
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
          >
            State *
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
              errors.state ? "border-red-500" : ""
            }`}
            style={{
              backgroundColor: "#F5F0E8",
              border: errors.state ? "1px solid #ef4444" : "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          />
          {errors.state && (
            <p className="text-xs mt-1 text-red-500">{errors.state}</p>
          )}
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
          >
            ZIP Code *
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
              errors.zipCode ? "border-red-500" : ""
            }`}
            style={{
              backgroundColor: "#F5F0E8",
              border: errors.zipCode
                ? "1px solid #ef4444"
                : "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          />
          {errors.zipCode && (
            <p className="text-xs mt-1 text-red-500">{errors.zipCode}</p>
          )}
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
          >
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
            style={{
              backgroundColor: "#F5F0E8",
              border: "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="NP">Nepal</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
          className="w-4 h-4 rounded-sm"
          style={{ accentColor: "#C4954A" }}
        />
        <label
          className="text-sm"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          Set as default address
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "#C4954A",
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          {isLoading ? "Saving..." : address ? "Update Address" : "Add Address"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-60"
          style={{
            backgroundColor: "#EDE8DE",
            color: "#1C1A17",
            fontFamily: "Outfit, sans-serif",
            border: "1px solid #D0C9BA",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
