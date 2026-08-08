import { Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { getImage, handleImageError } from "@/utils/images";

// Map category id → image path using working product images
const categoryImages = {
  Bats: "/images/bats/kookaburra-kahuna.jpg",
  Balls: "/images/balls/kookaburra-turf.jpg",
  "Protective Gear": "/images/protective/keeper-gloves.jpg",
  Footwear: "/images/footwear/kookaburra-spikes.jpg",
  Accessories: "/images/accessories/kookaburra-bag.jpg",
};

const categoryAlts = {
  Bats: "Premium cricket bats",
  Balls: "Professional cricket balls",
  "Protective Gear": "Cricket protective gear",
  Footwear: "Cricket footwear collection",
  Accessories: "Cricket accessories",
};

// Exclude "All Products" — show only real category cards
const displayCategories = categories.filter((c) => c.id !== "all");

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="group relative overflow-hidden rounded-sm block bg-stone-200"
      style={{ aspectRatio: "4/5" }}
    >
      <img
        src={getImage(categoryImages[category.name])}
        alt={categoryAlts[category.name]}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={handleImageError}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(28,26,23,0.65) 0%, transparent 55%)",
        }}
      />
      <div className="absolute bottom-6 left-6 right-6">
        <p
          className="text-xs mb-1"
          style={{
            color: "rgba(245,240,232,0.6)",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          {category.count} products
        </p>
        <h3
          className="text-xl font-medium"
          style={{ fontFamily: "Playfair Display, serif", color: "#F5F0E8" }}
        >
          {category.name}
        </h3>
        <div
          className="mt-3 text-xs font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
        >
          Explore →
        </div>
      </div>
    </Link>
  );
};

const CategoryGrid = () => {
  return (
    <section
      id="categories"
      className="py-10 sm:py-14 lg:py-20 max-w-7xl mx-auto px-6 lg:px-10"
    >
      <div className="mb-14">
        <p
          className="text-xs font-medium tracking-widest uppercase mb-3"
          style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
        >
          Browse by Category
        </p>
        <h2
          className="leading-tight"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 500,
            color: "#1C1A17",
          }}
        >
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        {displayCategories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
