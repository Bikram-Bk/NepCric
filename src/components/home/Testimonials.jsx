import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "NepCric has completely elevated my game. The quality of their bats is exceptional, and the performance on the pitch speaks for itself.",
    author: "Sandeep Lamichhane",
    location: "Kathmandu, NP",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "As a professional cricketer, I need gear I can trust. NepCric delivers world-class equipment that gives me confidence every time I step onto the field.",
    author: "Paras Khadka",
    location: "Kathmandu, NP",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "From training to match day, NepCric has been my go-to for cricket gear. Their products are built to last and perform at the highest level.",
    author: "Dipendra Singh Airee",
    location: "Nepalgunj, NP",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "The quality and durability of NepCric equipment are outstanding. I trust their gear for every match and recommend them to all aspiring cricketers.",
    author: "Kushal Bhurtel",
    location: "Butwal, NP",
    rating: 5,
  },
];

const StarRating = ({ count }) => {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" width="14" height="14" fill="#C4954A">
          <path d="M6 1l1.3 3.9H11L8.2 7l1.3 3.9L6 8.8 2.5 10.9 3.8 7 1 4.9h3.7z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1,
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1,
    );
  };

  return (
    <section
      id="testimonies"
      className="py-10 sm:py-14 lg:py-20 max-w-7xl mx-auto px-6 lg:px-10"
    >
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        {/* Left Column */}
        <div>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
          >
            Customer Stories
          </p>
          <h2
            className="leading-tight mb-6"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              color: "#1C1A17",
            }}
          >
            Loved by Nepali
            <br />
            <em>Cricket Stars</em>
          </h2>
          <p
            className="text-base leading-relaxed mb-10 max-w-sm"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            Real players, real stories — hear from Nepal's finest cricketers
            who trust NepCric for their game.
          </p>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: activeTestimonial === i ? "28px" : "8px",
                    height: "8px",
                    backgroundColor:
                      activeTestimonial === i ? "#C4954A" : "#D0C9BA",
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Next/Prev Buttons */}
            <div className="flex gap-2 ml-4">
              <button
                onClick={prevTestimonial}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-200"
                style={{
                  border: "1px solid #D0C9BA",
                  color: "#1C1A17",
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-200"
                style={{
                  border: "1px solid #D0C9BA",
                  color: "#1C1A17",
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Testimonial Display */}
        <div className="relative min-h-[300px]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className="transition-all duration-500"
              style={{
                position: i === 0 ? "relative" : "absolute",
                inset: i === 0 ? undefined : 0,
                opacity: activeTestimonial === i ? 1 : 0,
                pointerEvents: activeTestimonial === i ? "auto" : "none",
                transform:
                  activeTestimonial === i
                    ? "translateY(0)"
                    : "translateY(12px)",
              }}
            >
              <div
                className="rounded-sm p-8 lg:p-10"
                style={{
                  backgroundColor: "#EDE8DE",
                  border: "1px solid #D0C9BA",
                }}
              >
                <StarRating count={t.rating} />
                <p
                  className="text-lg lg:text-xl leading-relaxed mb-8"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontStyle: "italic",
                    color: "#1C1A17",
                    fontWeight: 400,
                  }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{
                      backgroundColor: "#C4954A",
                      color: "#fff",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        color: "#1C1A17",
                      }}
                    >
                      {t.author}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{
                        color: "#7A7468",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      {t.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;