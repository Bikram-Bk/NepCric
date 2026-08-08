import { useState, useEffect } from "react";
import { constants } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { formatters } from "@/utils/formatters";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/orderService";
import ShippingForm from "@/components/checkout/ShippingForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = total;
  const shipping =
    subtotal > constants.FREE_SHIPPING_THRESHOLD ? 0 : constants.SHIPPING_COST;
  const tax = subtotal * constants.TAX_RATE;
  const grandTotal = subtotal + shipping + tax;

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart.length, navigate]);

  const handleShippingSubmit = (data) => {
    setShippingDetails(data);
    setStep(2);
  };

  const handlePaymentSubmit = (method, cardDetails) => {
    setPaymentDetails({ method, cardDetails });
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    try {
      const orderData = {
        userId: user?.id || "guest",
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        shippingDetails,
        paymentDetails,
        subtotal,
        shipping,
        tax,
        total: grandTotal,
        status: "pending",
      };

      const newOrder = orderService.createOrder(orderData);
      clearCart();
      navigate(`/checkout/success?orderId=${newOrder.id}`);
    } catch (error) {
      console.error("Order placement failed:", error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleBack = () => {
    navigate("/cart");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-[#C4954A] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s
                  ? "bg-[#C4954A] text-white"
                  : "bg-[#EDE8DE] text-[#7A7468]"
              }`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {s}
            </div>
            <span
              className={`text-sm ${step >= s ? "text-[#1C1A17]" : "text-[#7A7468]"}`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {s === 1 ? "Shipping" : s === 2 ? "Payment" : "Review"}
            </span>
            {s < 3 && <span className="text-[#7A7468]">→</span>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-sm border border-[#D0C9BA]">
            <h2
              className="text-xl font-bold mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#1C1A17",
              }}
            >
              {step === 1 && "Shipping Information"}
              {step === 2 && "Payment Method"}
              {step === 3 && "Review Order"}
            </h2>

            {step === 1 && (
              <ShippingForm
                onSubmit={handleShippingSubmit}
                initialData={shippingDetails}
              />
            )}

            {step === 2 && <PaymentMethod onSubmit={handlePaymentSubmit} />}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3
                    className="text-sm font-semibold mb-2"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#1C1A17",
                    }}
                  >
                    Shipping Address
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: "#7A7468",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {shippingDetails?.firstName} {shippingDetails?.lastName}
                    <br />
                    {shippingDetails?.address}
                    <br />
                    {shippingDetails?.city}, {shippingDetails?.state}{" "}
                    {shippingDetails?.zipCode}
                    <br />
                    {shippingDetails?.country}
                  </p>
                </div>

                <div>
                  <h3
                    className="text-sm font-semibold mb-2"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#1C1A17",
                    }}
                  >
                    Payment Method
                  </h3>
                  <p
                    className="text-sm capitalize"
                    style={{
                      color: "#7A7468",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {paymentDetails?.method}
                  </p>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className="w-full py-3 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#C4954A",
                    color: "#fff",
                    fontFamily: "Outfit, sans-serif",
                    letterSpacing: "0.06em",
                  }}
                >
                  {isPlacingOrder ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Placing Order...
                    </span>
                  ) : (
                    `Place Order - ${formatters.price(grandTotal)}`
                  )}
                </button>

                <button
                  onClick={() => setStep(2)}
                  className="w-full text-sm transition-colors hover:opacity-60"
                  style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
                >
                  Back to Payment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={grandTotal}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
