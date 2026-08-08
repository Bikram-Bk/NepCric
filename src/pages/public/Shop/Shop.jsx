import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { useState, useEffect } from "react";
import { categories } from "@/data/categories";
import { Search, Filter, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");

  // Sync URL searchParam changes to state
  useEffect(() => {
    const q = searchParams.get("search") || "";
    setSearchTerm(q);
    const cat = searchParams.get("category") || "all";
    setSelectedCategory(cat);
  }, [searchParams]);

  const minPrice = 0;
  const maxPrice = Math.max(...products.map((p) => p.price));

  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic products per page based on screen size
  const getProductsPerPage = () => {
    const width = window.innerWidth;
    let cols = 2;
    if (width >= 1280) cols = 3;
    else if (width >= 1024) cols = 3;
    else if (width >= 640) cols = 2;
    return cols * 3;
  };

  const [productsPerPage, setProductsPerPage] = useState(getProductsPerPage());

  // Update products per page on window resize
  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(getProductsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Reset price range when products change (only max, min stays 0)
  useEffect(() => {
    const newMax = Math.max(...products.map((p) => p.price));
    setPriceRange((prev) => ({ ...prev, max: newMax }));
  }, []);

  // Filter products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== "All Brands") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Price filter
    result = result.filter(
      (p) =>
        p.price >= Number(priceRange.min) && p.price <= Number(priceRange.max),
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, sortBy]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  //  Handle price input change - prevents leading zeros
  const handlePriceChange = (type, value) => {
    // Remove leading zeros and convert to number
    let numValue = value.replace(/^0+/, "");
    if (numValue === "") {
      numValue = "0";
    }
    const parsed = parseInt(numValue) || 0;
    setPriceRange((prev) => ({
      ...prev,
      [type]: parsed,
    }));
  };

  if (isLoading) {
    return (
      <div className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-[#C4954A] border-gray-200 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
          >
            Shop All
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "#7A7468" }}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1"
              style={{
                backgroundColor: "#F5F0E8",
                border: "1px solid #D0C9BA",
                color: "#1C1A17",
                fontFamily: "Outfit, sans-serif",
              }}
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-sm sm:hidden"
            style={{
              backgroundColor: "#2C2A26",
              color: "#F5F0E8",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            <Filter size={16} />
            Filters
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1"
            style={{
              backgroundColor: "#F5F0E8",
              border: "1px solid #D0C9BA",
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters - Desktop */}
        <aside className="hidden sm:block w-64 flex-shrink-0">
          <div className="space-y-6">
            <div>
              <h3
                className="text-sm font-semibold mb-3"
                style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
              >
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-[#C4954A] text-white"
                        : "hover:bg-[#EDE8DE]"
                    }`}
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: selectedCategory === cat.id ? "#fff" : "#1C1A17",
                    }}
                  >
                    {cat.name}
                    <span className="float-right text-xs opacity-60">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3
                className="text-sm font-semibold mb-3"
                style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
              >
                Brands
              </h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      selectedBrand === brand
                        ? "bg-[#C4954A] text-white"
                        : "hover:bg-[#EDE8DE]"
                    }`}
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: selectedBrand === brand ? "#fff" : "#1C1A17",
                    }}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range - Now from 0 to max */}
            <div>
              <h3
                className="text-sm font-semibold mb-3"
                style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
              >
                Price Range (NPR)
              </h3>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                  className="w-20 px-2 py-1 text-sm rounded-sm"
                  style={{
                    backgroundColor: "#F5F0E8",
                    border: "1px solid #D0C9BA",
                    color: "#1C1A17",
                    fontFamily: "Outfit, sans-serif",
                  }}
                  placeholder="0"
                />
                <span style={{ color: "#7A7468" }}>to</span>
                <input
                  type="text"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                  className="w-20 px-2 py-1 text-sm rounded-sm"
                  style={{
                    backgroundColor: "#F5F0E8",
                    border: "1px solid #D0C9BA",
                    color: "#1C1A17",
                    fontFamily: "Outfit, sans-serif",
                  }}
                  placeholder="Max"
                />
              </div>
              <div
                className="flex justify-between text-[10px] mt-1"
                style={{ color: "#7A7468" }}
              >
                <span>NPR 0</span>
                <span>NPR {maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedBrand("All Brands");
                setPriceRange({ min: 0, max: maxPrice });
                setSearchTerm("");
                setSortBy("featured");
              }}
              className="w-full px-4 py-2 text-sm rounded-sm transition-colors hover:opacity-80"
              style={{
                backgroundColor: "#EDE8DE",
                color: "#1C1A17",
                fontFamily: "Outfit, sans-serif",
                border: "1px solid #D0C9BA",
              }}
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Mobile Filters - Overlay */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:hidden">
            <div
              className="w-full max-h-[80vh] rounded-t-2xl p-6 overflow-y-auto"
              style={{ backgroundColor: "#F5F0E8" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "#1C1A17",
                  }}
                >
                  Filters
                </h3>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X size={24} style={{ color: "#1C1A17" }} />
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="mb-6">
                <h4
                  className="text-sm font-semibold mb-2"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setIsFilterOpen(false);
                      }}
                      className={`px-3 py-1.5 text-sm rounded-sm ${
                        selectedCategory === cat.id
                          ? "bg-[#C4954A] text-white"
                          : "bg-[#EDE8DE]"
                      }`}
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Brands */}
              <div className="mb-6">
                <h4
                  className="text-sm font-semibold mb-2"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  Brands
                </h4>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setIsFilterOpen(false);
                      }}
                      className={`px-3 py-1.5 text-sm rounded-sm ${
                        selectedBrand === brand
                          ? "bg-[#C4954A] text-white"
                          : "bg-[#EDE8DE]"
                      }`}
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Range */}
              <div className="mb-6">
                <h4
                  className="text-sm font-semibold mb-2"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  Price Range (NPR)
                </h4>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange("min", e.target.value)}
                    className="w-20 px-2 py-1 text-sm rounded-sm"
                    style={{
                      backgroundColor: "#F5F0E8",
                      border: "1px solid #D0C9BA",
                      color: "#1C1A17",
                      fontFamily: "Outfit, sans-serif",
                    }}
                    placeholder="0"
                  />
                  <span style={{ color: "#7A7468" }}>to</span>
                  <input
                    type="text"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange("max", e.target.value)}
                    className="w-20 px-2 py-1 text-sm rounded-sm"
                    style={{
                      backgroundColor: "#F5F0E8",
                      border: "1px solid #D0C9BA",
                      color: "#1C1A17",
                      fontFamily: "Outfit, sans-serif",
                    }}
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedBrand("All Brands");
                  setPriceRange({ min: 0, max: maxPrice });
                  setSearchTerm("");
                  setSortBy("featured");
                  setIsFilterOpen(false);
                }}
                className="w-full px-4 py-2 text-sm rounded-sm"
                style={{
                  backgroundColor: "#EDE8DE",
                  color: "#1C1A17",
                  fontFamily: "Outfit, sans-serif",
                  border: "1px solid #D0C9BA",
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#1C1A17",
                }}
              >
                No Products Found
              </h3>
              <p style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}>
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm rounded-sm disabled:opacity-50"
                    style={{
                      backgroundColor: "#EDE8DE",
                      color: "#1C1A17",
                      fontFamily: "Outfit, sans-serif",
                      border: "1px solid #D0C9BA",
                    }}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 text-sm rounded-sm ${
                        currentPage === i + 1
                          ? "bg-[#C4954A] text-white"
                          : "bg-[#EDE8DE] text-[#1C1A17]"
                      }`}
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        border: "1px solid #D0C9BA",
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm rounded-sm disabled:opacity-50"
                    style={{
                      backgroundColor: "#EDE8DE",
                      color: "#1C1A17",
                      fontFamily: "Outfit, sans-serif",
                      border: "1px solid #D0C9BA",
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
