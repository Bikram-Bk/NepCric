import { Link } from "react-router-dom";
import { HelpCircle, Shield, Truck, CreditCard, Package, RefreshCcw } from "lucide-react";

const Help = () => {
    const helpTopics = [
        {
            icon: Package,
            title: "Order Issues",
            description: "Track your order, cancel or modify items",
            link: "/help/orders",
        },
        {
            icon: Truck,
            title: "Shipping & Delivery",
            description: "Delivery times, tracking, and shipping costs",
            link: "/shipping",
        },
        {
            icon: RefreshCcw,
            title: "Returns & Exchanges",
            description: "Return policy, process, and refunds",
            link: "/returns",
        },
        {
            icon: Shield,
            title: "Warranty & Repairs",
            description: "Product warranty and repair services",
            link: "/help/warranty",
        },
        {
            icon: CreditCard,
            title: "Payments & Billing",
            description: "Payment methods, invoices, and billing",
            link: "/help/payments",
        },
        {
            icon: HelpCircle,
            title: "Product Information",
            description: "Product care, sizing, and specifications",
            link: "/help/products",
        },
    ];

    const faqs = [
        {
            question: "How can I track my order?",
            answer:
                "You can track your order by logging into your account and visiting the 'Orders' section. You'll also receive a tracking number via email once your order ships.",
        },
        {
            question: "What payment methods do you accept?",
            answer:
                "We accept all major credit cards (Visa, MasterCard, American Express), UPI, and net banking. All transactions are secure and encrypted.",
        },
        {
            question: "How long does shipping take?",
            answer:
                "Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders.",
        },
        {
            question: "What is your return policy?",
            answer:
                "We offer a 30-day return policy on all unused items in their original packaging. Please visit our Returns page for more details.",
        },
    ];

    return (
        <div className="py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            {/* Breadcrumb */}
            <div
                className="flex items-center gap-2 text-sm mb-6"
                style={{ fontFamily: "Outfit, sans-serif" }}
            >
                <Link to="/" className="hover:opacity-60 transition-opacity" style={{ color: "#C4954A" }}>
                    Home
                </Link>
                <span style={{ color: "#7A7468" }}>/</span>
                <span style={{ color: "#1C1A17" }}>Help Center</span>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
                <h1
                    className="text-3xl sm:text-4xl font-bold mb-3"
                    style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
                >
                    How Can We <span style={{ color: "#C4954A" }}>Help</span> You?
                </h1>
                <p
                    className="text-sm max-w-2xl mx-auto"
                    style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
                >
                    Find answers to common questions, learn about our policies, and get the support you need.
                </p>
            </div>

            {/* Help Topics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
                {helpTopics.map((topic, index) => {
                    const Icon = topic.icon;
                    return (
                        <Link
                            key={index}
                            to={topic.link}
                            className="bg-white p-6 rounded-sm border border-[#D0C9BA] hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#C4954A20" }}>
                                <Icon size={20} style={{ color: "#C4954A" }} />
                            </div>
                            <h3 className="text-base font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}>
                                {topic.title}
                            </h3>
                            <p className="text-sm" style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}>
                                {topic.description}
                            </p>
                        </Link>
                    );
                })}
            </div>

            {/* FAQ Section */}
            <div className="bg-[#EDE8DE] p-6 sm:p-8 rounded-sm border border-[#D0C9BA]">
                <h2
                    className="text-xl font-bold mb-6 text-center"
                    style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
                >
                    Frequently Asked Questions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white p-4 rounded-sm border border-[#D0C9BA]">
                            <h4 className="text-sm font-semibold mb-2" style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}>
                                {faq.question}
                            </h4>
                            <p className="text-sm" style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}>
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-6">
                    <Link
                        to="/faq"
                        className="text-sm font-medium transition-colors hover:opacity-60"
                        style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
                    >
                        View All FAQs →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Help;