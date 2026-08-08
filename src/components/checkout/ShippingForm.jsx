import { useState } from "react";

const ShippingForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zipCode: initialData?.zipCode || "",
    country: initialData?.country || "NP",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State/Province is required";
    if (!formData.zipCode) newErrors.zipCode = "Postal code is required";

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
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
            <p
              className="text-xs mt-1"
              style={{ color: "#ef4444", fontFamily: "Outfit, sans-serif" }}
            >
              {errors.firstName}
            </p>
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
            className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
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
            <p
              className="text-xs mt-1"
              style={{ color: "#ef4444", fontFamily: "Outfit, sans-serif" }}
            >
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
          style={{
            backgroundColor: "#F5F0E8",
            border: errors.email ? "1px solid #ef4444" : "1px solid #D0C9BA",
            color: "#1C1A17",
            fontFamily: "Outfit, sans-serif",
          }}
        />
        {errors.email && (
          <p
            className="text-xs mt-1"
            style={{ color: "#ef4444", fontFamily: "Outfit, sans-serif" }}
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
          style={{
            backgroundColor: "#F5F0E8",
            border: "1px solid #D0C9BA",
            color: "#1C1A17",
            fontFamily: "Outfit, sans-serif",
          }}
          placeholder="98XXXXXXXX"
        />
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
          className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
          style={{
            backgroundColor: "#F5F0E8",
            border: errors.address ? "1px solid #ef4444" : "1px solid #D0C9BA",
            color: "#1C1A17",
            fontFamily: "Outfit, sans-serif",
          }}
          placeholder="House number, street, ward no."
        />
        {errors.address && (
          <p
            className="text-xs mt-1"
            style={{ color: "#ef4444", fontFamily: "Outfit, sans-serif" }}
          >
            {errors.address}
          </p>
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
            className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
            style={{
              backgroundColor: "#F5F0E8",
              border: errors.city ? "1px solid #ef4444" : "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
            placeholder="Kathmandu"
          />
          {errors.city && (
            <p
              className="text-xs mt-1"
              style={{ color: "#ef4444", fontFamily: "Outfit, sans-serif" }}
            >
              {errors.city}
            </p>
          )}
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
          >
            State/Province *
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
            style={{
              backgroundColor: "#F5F0E8",
              border: errors.state ? "1px solid #ef4444" : "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
            placeholder="Province No. 1"
          />
          {errors.state && (
            <p
              className="text-xs mt-1"
              style={{ color: "#ef4444", fontFamily: "Outfit, sans-serif" }}
            >
              {errors.state}
            </p>
          )}
        </div>
        <div className="col-span-1">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
          >
            Postal Code *
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
            style={{
              backgroundColor: "#F5F0E8",
              border: errors.zipCode
                ? "1px solid #ef4444"
                : "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
            placeholder="44600"
          />
          {errors.zipCode && (
            <p
              className="text-xs mt-1"
              style={{ color: "#ef4444", fontFamily: "Outfit, sans-serif" }}
            >
              {errors.zipCode}
            </p>
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
            <option value="NP">Nepal</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="IN">India</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
        style={{
          backgroundColor: "#C4954A",
          color: "#fff",
          fontFamily: "Outfit, sans-serif",
          letterSpacing: "0.06em",
        }}
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default ShippingForm;
