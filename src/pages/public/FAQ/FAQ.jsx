import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and UPI payments. All transactions are secure and encrypted.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders. You will receive a tracking number once your order ships.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all unused items in their original packaging. Simply contact our support team to initiate a return.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. International shipping rates and times vary by destination.",
    },
    {
      question: "How do I track my order?",
      answer:
        'Once your order ships, you will receive a tracking number via email. You can also track your order in the "My Orders" section of your account.',
    },
    {
      question: "Are your products authentic?",
      answer:
        "Yes, all our products are 100% authentic and sourced directly from authorized manufacturers and distributors.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it. Contact our support team immediately for assistance.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, we offer premium gift wrapping services for an additional charge. You can select this option during checkout.",
    },
    {
      question: "Do you deliver to all cities in Nepal?",
      answer:
        "Yes, we deliver to all major cities including Kathmandu, Pokhara, Biratnagar, and Lalitpur.",
    },
    {
      question: "What are the shipping charges within Nepal?",
      answer:
        "We offer free shipping on orders over NPR 25,000. Standard shipping is NPR 999.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-8 sm:py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <div
        className="flex items-center gap-2 text-sm mb-6"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <Link
          to="/"
          className="hover:opacity-60 transition-opacity"
          style={{ color: "#C4954A" }}
        >
          Home
        </Link>
        <span style={{ color: "#7A7468" }}>/</span>
        <span style={{ color: "#1C1A17" }}>FAQ</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Frequently Asked <span style={{ color: "#C4954A" }}>Questions</span>
        </h1>
        <p
          className="text-sm"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Find answers to the most common questions about CricketPro.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-md mx-auto">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "#7A7468" }}
        />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-sm focus:outline-none focus:ring-1"
          style={{
            backgroundColor: "#F5F0E8",
            border: "1px solid #D0C9BA",
            color: "#1C1A17",
            fontFamily: "Outfit, sans-serif",
          }}
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <p
              className="text-sm"
              style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
            >
              No questions found matching your search.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border rounded-sm transition-all duration-200"
                style={{
                  borderColor: isOpen ? "#C4954A" : "#D0C9BA",
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left transition-colors hover:bg-[#EDE8DE]/50 rounded-sm"
                >
                  <span
                    className="text-sm font-medium"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#1C1A17",
                    }}
                  >
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={18} style={{ color: "#C4954A" }} />
                  ) : (
                    <ChevronDown size={18} style={{ color: "#7A7468" }} />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <div className="px-4 pb-4 pt-1">
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "#7A7468",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 text-center bg-[#EDE8DE] p-6 rounded-sm border border-[#D0C9BA]">
        <h3
          className="text-lg font-bold mb-2"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Still Have Questions?
        </h3>
        <p
          className="text-sm mb-4"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Can't find what you're looking for? Contact our support team.
        </p>
        <Link
          to="/contact"
          className="px-6 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90 inline-block"
          style={{
            backgroundColor: "#C4954A",
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default FAQ;
