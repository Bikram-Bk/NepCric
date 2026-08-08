import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "#1C1A17", borderTop: "1px solid #2C2A26" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <span
                className="text-2xl"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 600,
                  color: "#F5F0E8",
                }}
              >
              NepCric
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full mt-0.5"
                style={{ backgroundColor: "#C4954A" }}
              />
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{
                color: "rgba(245,240,232,0.5)",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Premium cricket equipment for considered performance. Handcrafted
              with certified materials and designed to endure. Serving
              cricketers across Nepal.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/cricketpronepal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  border: "1px solid rgba(245,240,232,0.15)",
                  color: "rgba(245,240,232,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E4405F";
                  e.currentTarget.style.borderColor = "#E4405F";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
                  e.currentTarget.style.color = "rgba(245,240,232,0.6)";
                }}
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://facebook.com/cricketpronepal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  border: "1px solid rgba(245,240,232,0.15)",
                  color: "rgba(245,240,232,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1877F2";
                  e.currentTarget.style.borderColor = "#1877F2";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
                  e.currentTarget.style.color = "rgba(245,240,232,0.6)";
                }}
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="https://twitter.com/cricketpronepal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  border: "1px solid rgba(245,240,232,0.15)",
                  color: "rgba(245,240,232,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#000000";
                  e.currentTarget.style.borderColor = "#000000";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
                  e.currentTarget.style.color = "rgba(245,240,232,0.6)";
                }}
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="https://youtube.com/cricketpronepal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  border: "1px solid rgba(245,240,232,0.15)",
                  color: "rgba(245,240,232,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF0000";
                  e.currentTarget.style.borderColor = "#FF0000";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
                  e.currentTarget.style.color = "rgba(245,240,232,0.6)";
                }}
              >
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  to="/shop"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?filter=new"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?filter=bestsellers"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?filter=sale"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Sale Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
            >
              Support
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  to="/help"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Privacy &amp; Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Nepal */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
            >
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  style={{ color: "#C4954A", flexShrink: 0, marginTop: 2 }}
                />
                <span
                  className="text-sm"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} style={{ color: "#C4954A", flexShrink: 0 }} />
                <span
                  className="text-sm"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  +977-1-4123456
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} style={{ color: "#C4954A", flexShrink: 0 }} />
                <span
                  className="text-sm"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  support@nepcric.com.np
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} style={{ color: "#C4954A", flexShrink: 0 }} />
                <span
                  className="text-sm"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Mon-Fri: 9AM - 6PM (NPT)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs"
          style={{
            borderTop: "1px solid rgba(245,240,232,0.1)",
            color: "rgba(245,240,232,0.3)",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          <span>&copy; {currentYear} NepCric. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:opacity-70 transition-opacity">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:opacity-70 transition-opacity">
              Terms of Service
            </Link>
            <Link to="/help" className="hover:opacity-70 transition-opacity">
              Help
            </Link>
            <Link to="/contact" className="hover:opacity-70 transition-opacity">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;