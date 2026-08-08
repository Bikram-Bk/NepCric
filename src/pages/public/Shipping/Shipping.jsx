import {
  Truck,
  Clock,
  MapPin,
  Package,
  Globe,
  Shield,
  CheckCircle,
} from "lucide-react";

const Shipping = () => {
  const shippingMethods = [
    {
      icon: Package,
      title: "Standard Shipping",
      price: "NPR 999",
      time: "3-5 Business Days",
      description: "Reliable delivery for all orders.",
    },
    {
      icon: Truck,
      title: "Express Shipping",
      price: "NPR 1,999",
      time: "1-2 Business Days",
      description: "Fast delivery for urgent orders.",
    },
    {
      icon: Globe,
      title: "International Shipping",
      price: "NPR 3,999",
      time: "7-14 Business Days",
      description: "Worldwide delivery available.",
    },
  ];

  const shippingInfo = [
    {
      icon: Shield,
      title: "Free Shipping",
      description: "Free standard shipping on all orders over NPR 25,000.",
    },
    {
      icon: Clock,
      title: "Processing Time",
      description: "Orders are processed within 1-2 business days.",
    },
    {
      icon: MapPin,
      title: "Delivery Areas",
      description:
        "We deliver to all major cities in Nepal and internationally.",
    },
    {
      icon: CheckCircle,
      title: "Order Tracking",
      description:
        "Track your order in real-time via the tracking link provided.",
    },
  ];

  return (
    <div className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Shipping <span style={{ color: "#C4954A" }}>Information</span>
        </h1>
        <p
          className="text-sm max-w-2xl mx-auto"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Learn about our shipping methods, delivery times, and tracking
          options.
        </p>
      </div>

      {/* Shipping Methods */}
      <div className="mb-12">
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Shipping <span style={{ color: "#C4954A" }}>Methods</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {shippingMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-sm border border-[#D0C9BA] text-center"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#C4954A20" }}
                >
                  <Icon size={24} style={{ color: "#C4954A" }} />
                </div>
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  {method.title}
                </h3>
                <p className="text-xl font-bold" style={{ color: "#C4954A" }}>
                  {method.price}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
                >
                  {method.time}
                </p>
                <p
                  className="text-sm mt-2"
                  style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
                >
                  {method.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shipping Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {shippingInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div
              key={index}
              className="bg-[#EDE8DE] p-6 rounded-sm border border-[#D0C9BA] text-center"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "#C4954A20" }}
              >
                <Icon size={20} style={{ color: "#C4954A" }} />
              </div>
              <h4
                className="text-sm font-semibold mb-1"
                style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
              >
                {info.title}
              </h4>
              <p
                className="text-xs"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                {info.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shipping;
