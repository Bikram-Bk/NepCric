import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  // Scroll to Featured section
  const scrollToFeatured = () => {
    const section = document.getElementById("featured");
    if (section) {
      const navbarHeight = 64;
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image - Full width and height */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/images/background_image.jpg"
          alt="Premium cricket equipment showcase"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "30% center",
          }}
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(to top, rgba(28,26,23,0.85) 0%, rgba(28,26,23,0.30) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Top floating badge */}
      <div className="absolute top-28 left-40 hidden lg:flex flex-col items-center gap-2 z-10">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-center text-xs font-medium leading-tight"
          style={{
            backgroundColor: "#C4954A",
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          NEW
          <br />
          2026
        </div>
      </div>

      {/* Hero content - aligned to right */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12 lg:pb-16 w-full">
          <div className="max-w-2xl ml-auto py-10 text-right">
            <h1
              className="leading-[1.1] mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                fontWeight: 500,
                color: "#F5F0E8",
                letterSpacing: "-0.01em",
              }}
            >
              <span className="block">Premium Cricket</span>
              <span className="block">
                <em>Equipment</em> &amp;
              </span>
              <span className="block">Gear</span>
            </h1>

            <p
              className="text-base lg:text-lg leading-relaxed mb-6 max-w-md ml-auto"
              style={{
                color: "rgba(245,240,232,0.75)",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 300,
              }}
            >
              Handcrafted cricket equipment designed for performance — materials
              sourced from certified suppliers, built to last generations.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
              {/* GET STARTED - Redirects to Signup page */}
              <Link to="/register">
                <button
                  className="px-6 py-2.5 text-xs font-medium rounded-sm transition-all duration-200 hover:opacity-90 flex items-center gap-2 group"
                  style={{
                    backgroundColor: "#C4954A",
                    color: "#fff",
                    fontFamily: "Outfit, sans-serif",
                    letterSpacing: "0.06em",
                  }}
                >
                  GET STARTED
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {/* EXPLORE - Scrolls to Featured section */}
              <button
                onClick={scrollToFeatured}
                className="px-6 py-2.5 text-xs font-medium rounded-sm border transition-all duration-200 hover:bg-white/10"
                style={{
                  borderColor: "rgba(245,240,232,0.4)",
                  color: "#F5F0E8",
                  fontFamily: "Outfit, sans-serif",
                  letterSpacing: "0.06em",
                }}
              >
                EXPLORE
              </button>
            </div>
          </div>

          {/* Stats row - aligned to right */}
          <div
            className="pt-6 flex gap-8 flex-wrap justify-end"
            style={{ borderTop: "1px solid rgba(245,240,232,0.2)" }}
          >
            {[
              { value: "2,400+", label: "Products" },
              { value: "98%", label: "Satisfaction" },
              { value: "14 yrs", label: "Craftsmanship" },
              { value: "Premium", label: "Quality" },
            ].map((s) => (
              <div key={s.label} className="text-right">
                <div
                  className="text-xl font-semibold"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "#F5F0E8",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[10px] mt-0.5"
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "Outfit, sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-10">
        <div className="w-px h-10 bg-white/40" />
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "#fff", fontFamily: "Outfit, sans-serif" }}
        >
          Scroll
        </p>
      </div>
    </section>
  );
};

export default Hero;
