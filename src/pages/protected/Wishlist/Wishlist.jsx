import { Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import WishlistItem from "@/components/wishlist/WishlistItem";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist";

const Wishlist = () => {
  const { wishlist, itemCount, removeFromWishlist, clearWishlist } =
    useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <EmptyWishlist />
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart size={28} style={{ color: "#C4954A" }} />
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "Playfair Display, serif", color: "#1C1A17" }}
          >
            Your Wishlist
          </h1>
          <span
            className="text-sm"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            ({itemCount} items)
          </span>
        </div>
        <button
          onClick={clearWishlist}
          className="text-sm transition-colors hover:opacity-60"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          Clear Wishlist
        </button>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 gap-2">
        {wishlist.map((item) => (
          <WishlistItem
            key={item.id}
            item={item}
            onRemove={removeFromWishlist}
            onMoveToCart={handleMoveToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
