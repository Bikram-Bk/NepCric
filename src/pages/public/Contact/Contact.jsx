import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (formData.message && formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  // ✅ Updated: Nepal contact information
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "support@cricketpro.com.np",
      link: "mailto:support@cricketpro.com.np",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977-1-4123456",
      link: "tel:+97714123456",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Kathmandu, Nepal",
    },
    { icon: Clock, label: "Business Hours", value: "Mon-Fri: 9AM - 6PM (NPT)" },
  ];

  if (isSubmitted) {
    return (
      <div className="py-8 sm:py-12 lg:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-white p-8 rounded-sm border border-[#D0C9BA] text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Send size={40} className="text-green-600" />
          </div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
          >
            Message Sent!
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: "", email: "", subject: "", message: "" });
            }}
            className="px-6 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#C4954A",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Get in <span style={{ color: "#C4954A" }}>Touch</span>
        </h1>
        <p
          className="text-sm"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          We'd love to hear from you. Drop us a message and we'll respond as
          soon as possible.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <div className="bg-[#EDE8DE] p-6 rounded-sm border border-[#D0C9BA]">
            <h3
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#1C1A17",
              }}
            >
              Contact Information
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#C4954A20" }}
                    >
                      <Icon size={14} style={{ color: "#C4954A" }} />
                    </div>
                    <div>
                      <p
                        className="text-xs font-medium"
                        style={{
                          color: "#7A7468",
                          fontFamily: "Outfit, sans-serif",
                        }}
                      >
                        {info.label}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-sm hover:opacity-60 transition-opacity"
                          style={{
                            color: "#1C1A17",
                            fontFamily: "Outfit, sans-serif",
                          }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p
                          className="text-sm"
                          style={{
                            color: "#1C1A17",
                            fontFamily: "Outfit, sans-serif",
                          }}
                        >
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-sm border border-[#D0C9BA]">
            <h3
              className="text-lg font-bold mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#1C1A17",
              }}
            >
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{
                      color: "#1C1A17",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    style={{
                      backgroundColor: "#F5F0E8",
                      border: errors.name
                        ? "1px solid #ef4444"
                        : "1px solid #D0C9BA",
                      color: "#1C1A17",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  />
                  {errors.name && (
                    <p className="text-xs mt-1 text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{
                      color: "#1C1A17",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    style={{
                      backgroundColor: "#F5F0E8",
                      border: errors.email
                        ? "1px solid #ef4444"
                        : "1px solid #D0C9BA",
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
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 ${
                    errors.subject ? "border-red-500" : ""
                  }`}
                  style={{
                    backgroundColor: "#F5F0E8",
                    border: errors.subject
                      ? "1px solid #ef4444"
                      : "1px solid #D0C9BA",
                    color: "#1C1A17",
                    fontFamily: "Outfit, sans-serif",
                  }}
                />
                {errors.subject && (
                  <p className="text-xs mt-1 text-red-500">{errors.subject}</p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1 resize-none ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  style={{
                    backgroundColor: "#F5F0E8",
                    border: errors.message
                      ? "1px solid #ef4444"
                      : "1px solid #D0C9BA",
                    color: "#1C1A17",
                    fontFamily: "Outfit, sans-serif",
                  }}
                />
                {errors.message && (
                  <p className="text-xs mt-1 text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#C4954A",
                  color: "#fff",
                  fontFamily: "Outfit, sans-serif",
                  letterSpacing: "0.06em",
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
