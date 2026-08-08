import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { formatters } from "@/utils/formatters";
import { useWishlist } from "@/context/WishlistContext";
import { getImageSrc, handleImageError } from "@/utils/images";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < Math.floor(rating)
                ? "fill-[#C4954A] text-[#C4954A]"
                : "text-gray-300"
            }
          />
        ))}
        <span className="text-xs ml-1" style={{ color: "#7A7468" }}>
          ({product.reviews})
        </span>
      </div>
    );
  };

  // Helper function to get tag color
  const getTagColor = (tag) => {
    const colors = {
      "Best Seller": "bg-green-500",
      Bestseller: "bg-green-500",
      Sale: "bg-red-500",
      Limited: "bg-[#C4954A]",
      Premium: "bg-purple-500",
      Popular: "bg-blue-500",
      New: "bg-blue-500",
    };
    return colors[tag] || "bg-gray-500";
  };

  return (
    <div className="group cursor-pointer">
      <div
        className="relative overflow-hidden rounded-sm mb-4 bg-stone-200 w-full"
        style={{ aspectRatio: "1/1", maxHeight: "240px" }}
      >
        {/* Product Image with Link */}
        <Link
          to={`/product/${product.id}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={getImageSrc(product.image)}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
          />
        </Link>

        {/* Tag Badge - Proper positioning */}
        {(product.tag || product.isNew) && (
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {product.tag && (
              <span
                className={`${getTagColor(product.tag)} text-white text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-sm shadow-sm`}
                style={{
                  fontFamily: "Outfit, sans-serif",
                  letterSpacing: "0.04em",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                {product.tag}
              </span>
            )}
            {product.isNew && !product.tag && (
              <span
                className="bg-blue-500 text-white text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-sm shadow-sm"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  letterSpacing: "0.04em",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                New
              </span>
            )}
          </div>
        )}

        {/*Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 bg-white/90 hover:bg-white shadow-sm"
          aria-label="Wishlist"
        >
          <Heart
            size={14}
            fill={isWishlisted ? "#C4954A" : "none"}
            stroke={isWishlisted ? "#C4954A" : "#1C1A17"}
            strokeWidth={1.5}
          />
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 left-3 right-3 py-2.5 text-[10px] sm:text-xs font-medium rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10"
          style={{
            backgroundColor: "#2C2A26",
            color: "#F5F0E8",
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          ADD TO CART
        </button>
      </div>

      {/*Product Info */}
      <div>
        <Link to={`/product/${product.id}`}>
          <p
            className="text-[10px] sm:text-xs mb-1"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            {product.category}
          </p>
          <h3
            className="text-sm font-medium mb-1 hover:opacity-70 transition-opacity line-clamp-2"
            style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
            >
              {formatters.price(product.price)}
            </span>
            {product.originalPrice && (
              <span
                className="text-xs line-through ml-2"
                style={{ color: "#7A7468" }}
              >
                {formatters.price(product.originalPrice)}
              </span>
            )}
          </div>
          {renderStars(product.rating)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
