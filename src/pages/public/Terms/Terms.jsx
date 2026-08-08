import {
  Shield,
  CheckCircle,
  AlertCircle,
  FileText,
  Scale,
  Gift,
  CreditCard,
  RefreshCcw,
} from "lucide-react";

const Terms = () => {
  const termsSections = [
    {
      icon: Shield,
      title: "General Terms",
      content:
        "By using NepCric's website and services, you agree to comply with and be bound by these terms and conditions. We reserve the right to update these terms at any time.",
    },
    {
      icon: Scale,
      title: "Use of Website",
      content:
        "You agree to use our website for lawful purposes only. You may not use our site to engage in any activity that violates local, national, or international laws or regulations.",
    },
    {
      icon: FileText,
      title: "Product Information",
      content:
        "We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, colors, or other content on our site are complete, reliable, or error-free.",
    },
    {
      icon: CheckCircle,
      title: "Orders & Payment",
      content:
        "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Payment must be made in full before products are shipped.",
    },
    {
      icon: Gift,
      title: "Promotions & Discounts",
      content:
        "Promotional offers and discounts are subject to specific terms and conditions. We reserve the right to modify or terminate promotions at any time without prior notice.",
    },
    {
      icon: CreditCard,
      title: "Payment Security",
      content:
        "All payments are processed through secure payment gateways. We do not store your credit card or payment information on our servers.",
    },
    {
      icon: RefreshCcw,
      title: "Returns & Refunds",
      content:
        "Our return policy allows returns within 30 days of delivery. Items must be unused and in original packaging. Refunds will be processed within 7-10 business days.",
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability",
      content:
        "CricketPro Nepal shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.",
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
          Terms &amp; <span style={{ color: "#C4954A" }}>Conditions</span>
        </h1>
        <p
          className="text-sm max-w-2xl mx-auto"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Please read these terms carefully before using our website and
          services.
        </p>
      </div>

      {/* Terms Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {termsSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-sm border border-[#D0C9BA] hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#C4954A20" }}
                >
                  <Icon size={18} style={{ color: "#C4954A" }} />
                </div>
                <h3
                  className="text-base font-semibold"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  {section.title}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                {section.content}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-10 bg-[#EDE8DE] p-6 rounded-sm border border-[#D0C9BA] text-center">
        <p
          className="text-sm"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          These terms and conditions were last updated on January 1, 2026. By
          continuing to use our website, you agree to these terms.
        </p>
      </div>
    </div>
  );
};

export default Terms;
