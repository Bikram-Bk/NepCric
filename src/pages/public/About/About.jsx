import { Link } from "react-router-dom";
import { Award, Target, Users, Shield, Heart, Trophy } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "We source only the finest materials for all our cricket equipment.",
    },
    {
      icon: Target,
      title: "Performance Driven",
      description:
        "Every product is designed to enhance your game performance.",
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "Built to last with rigorous quality testing standards.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our top priority, always.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "50+", label: "Countries Served" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "14+", label: "Years of Excellence" },
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
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
        <span style={{ color: "#1C1A17" }}>About</span>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          About <span style={{ color: "#C4954A" }}>CricketPro</span>
        </h1>
        <p
          className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          CricketPro Nepal is dedicated to providing premium cricket equipment
          for players across Nepal. Our commitment to quality and craftsmanship
          ensures every product meets the highest standards.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <div className="bg-[#EDE8DE] p-6 lg:p-8 rounded-sm border border-[#D0C9BA]">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#C4954A20" }}
            >
              <Trophy size={20} style={{ color: "#C4954A" }} />
            </div>
            <h2
              className="text-xl font-bold"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#1C1A17",
              }}
            >
              Our Mission
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            To provide cricketers with premium equipment that enhances
            performance, builds confidence, and inspires excellence on the
            pitch. We believe that the right gear can transform your game.
          </p>
        </div>

        <div className="bg-[#EDE8DE] p-6 lg:p-8 rounded-sm border border-[#D0C9BA]">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#C4954A20" }}
            >
              <Users size={20} style={{ color: "#C4954A" }} />
            </div>
            <h2
              className="text-xl font-bold"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#1C1A17",
              }}
            >
              Our Vision
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            To be the most trusted name in cricket equipment worldwide, known
            for quality, innovation, and commitment to the sport we love. Every
            player deserves the best gear to achieve their full potential.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-10"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Our <span style={{ color: "#C4954A" }}>Values</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 text-center rounded-sm border border-[#D0C9BA] transition-all duration-200 hover:shadow-md"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: "#C4954A20" }}
                >
                  <Icon size={22} style={{ color: "#C4954A" }} />
                </div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
                >
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#EDE8DE] p-8 rounded-sm border border-[#D0C9BA] mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-r border-[#D0C9BA] last:border-0 px-4"
            >
              <p
                className="text-2xl sm:text-3xl font-bold"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#C4954A",
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Ready to <span style={{ color: "#C4954A" }}>Elevate</span> Your Game?
        </h2>
        <p
          className="text-sm mb-6"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Explore our premium collection and experience the CricketPro
          difference.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/shop"
            className="px-6 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#C4954A",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            Shop Now
          </Link>
          <Link
            to="/contact"
            className="px-6 py-2.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#EDE8DE",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
              border: "1px solid #D0C9BA",
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
