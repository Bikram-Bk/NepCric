import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{
        backgroundColor: "#C4954A",
        color: "#fff",
        boxShadow: "0 4px 15px rgba(196, 149, 74, 0.4)",
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} strokeWidth={2} />
    </button>
  );
};

export default ScrollToTop;
