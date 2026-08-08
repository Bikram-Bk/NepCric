import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Search,
  User,
  LogOut,
  Package,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

// ✅ Navigation links in your requested order
const NAV_LINKS = [
  { name: "Featured", id: "featured" },
  { name: "Categories", id: "categories" },
  { name: "Testimonies", id: "testimonies" },
  { name: "Shop", path: "/shop", isPage: true },
  { name: "About", path: "/about", isPage: true },
  { name: "Contact", path: "/contact", isPage: true },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;

      const isHomePage = location.pathname === "/";
      const threshold = isHomePage ? heroHeight * 0.5 : 20;

      setScrolled(scrollPosition > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
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

  // Handle navigation click
  const handleNavClick = (link) => {
    setMenuOpen(false);

    if (link.isPage) {
      navigate(link.path);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(link.id);
      }, 100);
    } else {
      scrollToSection(link.id);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled
          ? "rgba(245,240,232,0.96)"
          : location.pathname === "/"
            ? "transparent"
            : "rgba(245,240,232,0.96)",
        backdropFilter: scrolled
          ? "blur(12px)"
          : location.pathname === "/"
            ? "none"
            : "blur(12px)",
        borderBottom: scrolled
          ? "1px solid #D0C9BA"
          : location.pathname === "/"
            ? "1px solid transparent"
            : "1px solid #D0C9BA",
        boxShadow: scrolled
          ? "0 4px 20px rgba(0,0,0,0.05)"
          : location.pathname === "/"
            ? "none"
            : "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* ✅ Logo - Updated for Nepal */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span
            className="text-2xl tracking-tight transition-colors duration-500"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 600,
              color:
                scrolled || location.pathname !== "/" ? "#1C1A17" : "#F5F0E8",
            }}
          >
            NepCric
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full mt-0.5 transition-colors duration-500"
            style={{ backgroundColor: "#C4954A" }}
          />
        </Link>

        {/* Desktop nav - Featured, Categories, Shop, Testimonies, About, Contact */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className="text-sm font-medium transition-colors duration-200 hover:opacity-60 cursor-pointer"
              style={{
                color:
                  scrolled || location.pathname !== "/"
                    ? "#1C1A17"
                    : "rgba(245,240,232,0.9)",
                fontFamily: "Outfit, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Actions - Search, Wishlist, Cart, Orders, Profile/Login */}
        <div className="hidden md:flex items-center gap-5">
          {/* 1. Search Icon & Floating Dropdown */}
          <div className="relative" ref={searchContainerRef}>
            <div className="relative group">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
                aria-label="Search"
                style={{
                  color:
                    scrolled || location.pathname !== "/"
                      ? "#1C1A17"
                      : "#F5F0E8",
                }}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-0.5 rounded-sm bg-[#1C1A17] text-[#F5F0E8]">
                Search
              </span>
            </div>

            {/* Floating Dropdown Search Modal */}
            {searchOpen && (
              <div className="absolute top-full right-0 mt-3 w-72 sm:w-80 bg-white rounded-md shadow-2xl border border-stone-200 p-3.5 z-50">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search bats, balls, gear..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 text-xs rounded-md border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C4954A] text-stone-900"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 text-xs font-medium text-white rounded-md transition-opacity hover:opacity-90 shrink-0"
                    style={{
                      backgroundColor: "#C4954A",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Search
                  </button>
                </form>
                <p
                  className="text-[10px] mt-2 text-stone-400 px-1"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Press <kbd className="px-1 py-0.5 bg-stone-100 rounded border">Enter</kbd> to view search results
                </p>
              </div>
            )}
          </div>

          {/* 2. Wishlist - With Tooltip */}
          <div className="relative group">
            <Link to="/wishlist">
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/5 relative"
                aria-label="Wishlist"
                style={{
                  color:
                    scrolled || location.pathname !== "/"
                      ? "#1C1A17"
                      : "#F5F0E8",
                }}
              >
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center px-1">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </Link>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-0.5 rounded-sm bg-[#1C1A17] text-[#F5F0E8]">
              Wishlist
            </span>
          </div>

          {/* 3. Cart - With Tooltip */}
          <div className="relative group">
            <Link to="/cart">
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/5 relative"
                aria-label="Cart"
                style={{
                  color:
                    scrolled || location.pathname !== "/"
                      ? "#1C1A17"
                      : "#F5F0E8",
                }}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center px-1">
                    {itemCount}
                  </span>
                )}
              </button>
            </Link>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-0.5 rounded-sm bg-[#1C1A17] text-[#F5F0E8]">
              Cart
            </span>
          </div>

          {/* 4. Orders Icon - With Tooltip */}
          {isAuthenticated && (
            <div className="relative group">
              <Link to="/orders">
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/5 relative"
                  aria-label="Orders"
                  style={{
                    color:
                      scrolled || location.pathname !== "/"
                        ? "#1C1A17"
                        : "#F5F0E8",
                  }}
                >
                  <Package size={18} strokeWidth={1.5} />
                </button>
              </Link>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-0.5 rounded-sm bg-[#1C1A17] text-[#F5F0E8]">
                Orders
              </span>
            </div>
          )}

          {/* 5. Profile/Login - With Tooltip */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Profile */}
              <div className="relative group">
                <Link to="/profile">
                  <button
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: "#C4954A",
                      color: "#fff",
                    }}
                    aria-label="Profile"
                  >
                    {getUserInitials()}
                  </button>
                </Link>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-0.5 rounded-sm bg-[#1C1A17] text-[#F5F0E8]">
                  Profile
                </span>
              </div>

              {/* Logout */}
              <div className="relative group">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:opacity-60"
                  style={{
                    color:
                      scrolled || location.pathname !== "/"
                        ? "#1C1A17"
                        : "rgba(245,240,232,0.9)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <Link to="/login">
                <button
                  className="px-5 py-2 text-sm font-medium transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor:
                      scrolled || location.pathname !== "/"
                        ? "#C4954A"
                        : "rgba(255,255,255,0.08)",
                    backdropFilter:
                      scrolled || location.pathname !== "/"
                        ? "none"
                        : "blur(8px)",
                    border:
                      scrolled || location.pathname !== "/"
                        ? "none"
                        : "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontFamily: "Outfit, sans-serif",
                    letterSpacing: "0.04em",
                    borderRadius: "20px",
                    padding: "8px 20px",
                  }}
                >
                  Login
                </button>
              </Link>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-0.5 rounded-sm bg-[#1C1A17] text-[#F5F0E8]">
                Login
              </span>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              backgroundColor:
                scrolled || location.pathname !== "/" ? "#1C1A17" : "#F5F0E8",
              transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              backgroundColor:
                scrolled || location.pathname !== "/" ? "#1C1A17" : "#F5F0E8",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              backgroundColor:
                scrolled || location.pathname !== "/" ? "#1C1A17" : "#F5F0E8",
              transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-y-auto transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "calc(100vh - 64px)" : "0",
          backgroundColor: menuOpen ? "rgba(245,240,232,0.70)" : "transparent",
          backdropFilter: menuOpen ? "blur(8px)" : "none",
          borderBottom: menuOpen ? "1px solid #D0C9BA" : "none",
          overflowY: "auto",
        }}
      >
        <div className="px-6 pb-8 pt-4 flex flex-col gap-2">
          {/* Mobile Links */}
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className="text-base font-medium py-3 text-left hover:bg-black/5 px-3 rounded-sm transition-colors"
              style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
            >
              {link.name}
            </button>
          ))}

          <div className="border-t border-gray-200/50 pt-4 mt-2">
            {/* Mobile Search Bar */}
            <form
              onSubmit={(e) => {
                handleSearchSubmit(e);
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 bg-white/80 border border-stone-300 rounded-full px-3 py-2 mb-3"
            >
              <Search size={16} className="text-stone-500 shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-transparent focus:outline-none text-stone-900"
                style={{ fontFamily: "Outfit, sans-serif" }}
              />
            </form>

            {/* Mobile Action Icons Row */}
            <div className="flex items-center justify-around gap-2 py-2">

              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-black/5 relative"
                  aria-label="Wishlist"
                  style={{ color: "#1C1A17" }}
                >
                  <Heart size={20} strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center px-1">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </Link>

              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-black/5 relative"
                  aria-label="Cart"
                  style={{ color: "#1C1A17" }}
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center px-1">
                      {itemCount}
                    </span>
                  )}
                </button>
              </Link>

              {isAuthenticated && (
                <Link to="/orders" onClick={() => setMenuOpen(false)}>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
                    aria-label="Orders"
                    style={{ color: "#1C1A17" }}
                  >
                    <Package size={20} strokeWidth={1.5} />
                  </button>
                </Link>
              )}

              {isAuthenticated ? (
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: "#C4954A",
                      color: "#fff",
                    }}
                    aria-label="Profile"
                  >
                    {getUserInitials()}
                  </button>
                </Link>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
                    style={{ color: "#1C1A17" }}
                    aria-label="Login"
                  >
                    <User size={20} strokeWidth={1.5} />
                  </button>
                </Link>
              )}
            </div>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full px-5 py-3.5 text-sm font-medium rounded-sm mt-2"
                style={{
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button
                  className="w-full px-5 py-3.5 text-sm font-medium rounded-sm mt-2"
                  style={{
                    backgroundColor: "#C4954A",
                    color: "#fff",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
