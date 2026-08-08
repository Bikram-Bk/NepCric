import {
  Shield,
  Eye,
  Database,
  Mail,
  Lock,
  Trash2,
  RefreshCcw,
  DollarSign,
  Calendar,
} from "lucide-react";

const Privacy = () => {
  const privacySections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content:
        "We collect information you provide directly, such as your name, email address, phone number, and shipping address when you create an account, place an order, or contact us. We also collect information about your interactions with our website, including browsing patterns and purchase history.",
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content:
        "Your information helps us process orders, provide customer support, send updates about your orders, and improve our products and services. We may also use your data to send promotional offers with your consent.",
    },
    {
      icon: Lock,
      title: "Data Security",
      content:
        "We implement industry-standard security measures to protect your personal information. All transactions are encrypted using SSL technology. We regularly update our security protocols to ensure your data remains safe.",
    },
    {
      icon: Mail,
      title: "Your Privacy Choices",
      content:
        "You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or by updating your account preferences. You also have the right to access, correct, or delete your personal data.",
    },
    {
      icon: Eye,
      title: "Cookies & Tracking",
      content:
        "We use cookies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie preferences through your browser settings.",
    },
    {
      icon: Trash2,
      title: "Data Retention & Deletion",
      content:
        "We retain your personal information only as long as necessary to fulfill the purposes for which it was collected. You can request deletion of your account and personal data at any time.",
    },
  ];

  const returnSections = [
    {
      icon: RefreshCcw,
      title: "Return Policy",
      content:
        "We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of delivery for a full refund or exchange.",
    },
    {
      icon: Calendar,
      title: "Return Timeframe",
      content:
        "Returns are accepted within 30 days from the date of delivery. Items must be unused, in their original condition, and in the original packaging. A proof of purchase is required.",
    },
    {
      icon: DollarSign,
      title: "Refund Process",
      content:
        "Once we receive and inspect your return, we will process your refund within 7-10 business days. Refunds will be issued to the original payment method used for the purchase.",
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
          Privacy &amp; <span style={{ color: "#C4954A" }}>Returns</span>
        </h1>
        <p
          className="text-sm max-w-2xl mx-auto"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Your privacy matters to us. Learn how we handle your data and our
          return policies.
        </p>
      </div>

      {/* Privacy Section */}
      <div className="mb-12">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Privacy <span style={{ color: "#C4954A" }}>Policy</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {privacySections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-sm border border-[#D0C9BA]"
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
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#1C1A17",
                    }}
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
      </div>

      {/* Returns Section */}
      <div>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Returns &amp; <span style={{ color: "#C4954A" }}>Exchanges</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {returnSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-sm border border-[#D0C9BA]"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: "#C4954A20" }}
                >
                  <Icon size={20} style={{ color: "#C4954A" }} />
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  {section.title}
                </h3>
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
      </div>
    </div>
  );
};

export default Privacy;
