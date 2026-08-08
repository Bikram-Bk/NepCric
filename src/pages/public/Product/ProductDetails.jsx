import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductReviews from "@/components/product/ProductReviews";
import { formatters } from "@/utils/formatters"; // ✅ Added import

// Helper functions
const getProductById = (id) => {
  return products.find((p) => p.id === parseInt(id));
};

const getRelatedProducts = (productId, category, limit = 4) => {
  return products
    .filter((p) => p.id !== productId && p.category === category)
    .slice(0, limit);
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product images (use product image or placeholder)
  const productImages = [
    product?.image || "/images/placeholder.jpg",
    product?.image || "/images/placeholder.jpg",
    product?.image || "/images/placeholder.jpg",
    product?.image || "/images/placeholder.jpg",
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setIsWishlisted(isInWishlist(foundProduct.id));
        const related = getRelatedProducts(
          foundProduct.id,
          foundProduct.category,
        );
        setRelatedProducts(related);
      }
      setIsLoading(false);
    }, 500);
  }, [id, isInWishlist]);

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product);
      setIsWishlisted(!isWishlisted);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < Math.floor(rating)
                ? "fill-[#C4954A] text-[#C4954A]"
                : "text-gray-300"
            }
          />
        ))}
        <span className="text-sm ml-2" style={{ color: "#7A7468" }}>
          ({product?.reviews || 0} reviews)
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-[#C4954A] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
        >
          Product Not Found
        </h2>
        <p
          className="text-sm mb-6"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          The product you're looking for doesn't exist or has been removed.
        </p>
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
          Back to Shop
        </Link>
      </div>
    );
  }

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
        <Link
          to="/shop"
          className="hover:opacity-60 transition-opacity"
          style={{ color: "#C4954A" }}
        >
          Shop
        </Link>
        <span style={{ color: "#7A7468" }}>/</span>
        <span style={{ color: "#1C1A17" }}>{product.name}</span>
      </div>

      {/* Product Main Section */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Left - Gallery */}
        <div>
          <div
            className="relative overflow-hidden rounded-sm bg-[#F0EBE0] mb-4"
            style={{ aspectRatio: "1/1", maxHeight: "480px" }}
          >
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {product.tag && (
              <div className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-sm z-10">
                <span
                  style={{
                    backgroundColor:
                      product.tag === "Best Seller"
                        ? "#22c55e"
                        : product.tag === "Sale"
                          ? "#ef4444"
                          : product.tag === "Limited"
                            ? "#C4954A"
                            : "#3b82f6",
                    color: "#fff",
                    fontFamily: "Outfit, sans-serif",
                    letterSpacing: "0.04em",
                    padding: "4px 12px",
                    borderRadius: "4px",
                  }}
                >
                  {product.tag}
                </span>
              </div>
            )}
            {product.isNew && (
              <div className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-sm z-10">
                <span
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "#fff",
                    fontFamily: "Outfit, sans-serif",
                    letterSpacing: "0.04em",
                    padding: "4px 12px",
                    borderRadius: "4px",
                  }}
                >
                  New
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 overflow-hidden rounded-sm bg-[#F0EBE0] transition-all duration-200 ${selectedImage === index
                  ? "ring-2 ring-[#C4954A]"
                  : "hover:opacity-70"
                  }`}
                style={{ aspectRatio: "1/1", width: "80px", height: "80px" }}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right - Product Info */}
        <div>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-2"
            style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
          >
            {product.category}
          </p>

          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
            style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
          >
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            {renderStars(product.rating)}
            <span
              className="text-sm"
              style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
            >
              {product.brand}
            </span>
          </div>

          {/* ✅ Updated: Price in NPR */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "Outfit, sans-serif", color: "#C4954A" }}
            >
              {formatters.price(product.price)}
            </span>
            {product.originalPrice && (
              <span
                className="text-lg line-through"
                style={{ color: "#7A7468" }}
              >
                {formatters.price(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-sm font-semibold text-green-600">
                Save {formatters.price(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-6">
            <div
              className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
            />
            <span
              className="text-sm font-medium"
              style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-sm font-medium"
              style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
            >
              Quantity:
            </span>
            <div
              className="flex items-center border rounded-sm"
              style={{ borderColor: "#D0C9BA" }}
            >
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="w-10 h-10 flex items-center justify-center hover:bg-[#EDE8DE] transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span
                className="w-12 text-center font-medium"
                style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
              >
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="w-10 h-10 flex items-center justify-center hover:bg-[#EDE8DE] transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 px-8 py-3.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#C4954A",
                color: "#fff",
                fontFamily: "Outfit, sans-serif",
                letterSpacing: "0.06em",
              }}
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`px-6 py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center gap-2 border ${isWishlisted
                ? "bg-[#C4954A] text-white border-[#C4954A]"
                : "border-[#D0C9BA] hover:bg-[#EDE8DE]"
                }`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <Heart
                size={18}
                fill={isWishlisted ? "#fff" : "none"}
                stroke={isWishlisted ? "#fff" : "#1C1A17"}
              />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>

          {/* Trust Badges */}
          <div
            className="grid grid-cols-3 gap-3 pt-6 border-t"
            style={{ borderColor: "#D0C9BA" }}
          >
            <div className="flex items-center gap-2">
              <Truck size={18} style={{ color: "#C4954A" }} />
              <span
                className="text-xs"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                Free Shipping
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} style={{ color: "#C4954A" }} />
              <span
                className="text-xs"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                2 Year Warranty
              </span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={18} style={{ color: "#C4954A" }} />
              <span
                className="text-xs"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                30 Day Returns
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-12">
        <div
          className="flex gap-6 border-b mb-6"
          style={{ borderColor: "#D0C9BA" }}
        >
          {["description", "specifications", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors ${activeTab === tab
                ? "border-b-2 border-[#C4954A]"
                : "hover:opacity-60"
                }`}
              style={{
                color: activeTab === tab ? "#C4954A" : "#7A7468",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p
              style={{
                color: "#7A7468",
                fontFamily: "Outfit, sans-serif",
                lineHeight: "1.8",
              }}
            >
              {product.description}
            </p>
            <p
              className="mt-4"
              style={{
                color: "#7A7468",
                fontFamily: "Outfit, sans-serif",
                lineHeight: "1.8",
              }}
            >
              This premium product is crafted with the highest quality materials
              and attention to detail. Whether you're a professional or an
              enthusiast, this product will exceed your expectations.
            </p>
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === "specifications" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(product.specifications || {}).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-3 border-b"
                  style={{ borderColor: "#D0C9BA" }}
                >
                  <span
                    className="text-sm font-medium capitalize"
                    style={{
                      color: "#1C1A17",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {key}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: "#7A7468",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ),
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && <ProductReviews productId={product.id} />}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#1C1A17",
              }}
            >
              You May Also Like
            </h2>
            <Link
              to="/shop"
              className="text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
              style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
