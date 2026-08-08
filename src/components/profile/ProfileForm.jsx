import { useState } from "react";
import { User, Mail, Phone } from "lucide-react";

const ProfileForm = ({ user, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
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
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          Full Name
        </label>
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "#7A7468" }}
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full pl-9 pr-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
              errors.name ? "border-red-500" : ""
            }`}
            style={{
              backgroundColor: "#F5F0E8",
              border: errors.name ? "1px solid #ef4444" : "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          />
          {errors.name && (
            <p className="text-xs mt-1 text-red-500">{errors.name}</p>
          )}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          Email Address
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "#7A7468" }}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-9 pr-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
              errors.email ? "border-red-500" : ""
            }`}
            style={{
              backgroundColor: "#F5F0E8",
              border: errors.email ? "1px solid #ef4444" : "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          />
          {errors.email && (
            <p className="text-xs mt-1 text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
        >
          Phone Number
        </label>
        <div className="relative">
          <Phone
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "#7A7468" }}
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-9 pr-3 py-2 rounded-sm focus:outline-none focus:ring-1"
            style={{
              backgroundColor: "#F5F0E8",
              border: "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "#C4954A",
          color: "#fff",
          fontFamily: "Outfit, sans-serif",
          letterSpacing: "0.06em",
        }}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileForm;
