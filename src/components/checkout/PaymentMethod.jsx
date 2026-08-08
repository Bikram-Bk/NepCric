import { useState } from "react";
import { CreditCard, Smartphone, Building } from "lucide-react";

const PaymentMethod = ({ onSubmit }) => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const paymentMethods = [
    { id: "card", label: "Credit / Debit Card", icon: CreditCard },
    { id: "upi", label: "UPI / Mobile Pay", icon: Smartphone },
    { id: "netbanking", label: "Net Banking", icon: Building },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedMethod, cardDetails);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-sm border-2 transition-all duration-200 ${
                isSelected
                  ? "border-[#C4954A] bg-[#EDE8DE]"
                  : "border-[#D0C9BA] hover:border-[#C4954A]"
              }`}
            >
              <Icon
                size={24}
                className={`mx-auto ${isSelected ? "text-[#C4954A]" : "text-[#7A7468]"}`}
              />
              <p
                className="text-xs mt-2 text-center"
                style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
              >
                {method.label}
              </p>
            </button>
          );
        })}
      </div>

      {selectedMethod === "card" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
            >
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
              className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
              style={{
                backgroundColor: "#F5F0E8",
                border: "1px solid #D0C9BA",
                color: "#1C1A17",
                fontFamily: "Outfit, sans-serif",
              }}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
              >
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleCardChange}
                className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
                style={{
                  backgroundColor: "#F5F0E8",
                  border: "1px solid #D0C9BA",
                  color: "#1C1A17",
                  fontFamily: "Outfit, sans-serif",
                }}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
              >
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={handleCardChange}
                className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
                style={{
                  backgroundColor: "#F5F0E8",
                  border: "1px solid #D0C9BA",
                  color: "#1C1A17",
                  fontFamily: "Outfit, sans-serif",
                }}
                required
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#1C1A17", fontFamily: "Outfit, sans-serif" }}
            >
              Name on Card
            </label>
            <input
              type="text"
              name="nameOnCard"
              placeholder="John Doe"
              value={cardDetails.nameOnCard}
              onChange={handleCardChange}
              className="w-full px-3 py-2 rounded-sm focus:outline-none focus:ring-1"
              style={{
                backgroundColor: "#F5F0E8",
                border: "1px solid #D0C9BA",
                color: "#1C1A17",
                fontFamily: "Outfit, sans-serif",
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#C4954A",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            Place Order
          </button>
        </form>
      )}

      {selectedMethod === "upi" && (
        <div className="text-center py-8">
          <Smartphone size={48} className="mx-auto text-[#C4954A]" />
          <p
            className="mt-4 text-sm"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            You will be redirected to your UPI app to complete payment.
          </p>
          <button
            onClick={() => onSubmit(selectedMethod, {})}
            className="w-full mt-6 py-3 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#C4954A",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            Pay with UPI
          </button>
        </div>
      )}

      {selectedMethod === "netbanking" && (
        <div className="text-center py-8">
          <Building size={48} className="mx-auto text-[#C4954A]" />
          <p
            className="mt-4 text-sm"
            style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
          >
            Select your bank to proceed with net banking.
          </p>
          <button
            onClick={() => onSubmit(selectedMethod, {})}
            className="w-full mt-6 py-3 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#C4954A",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            Pay with Net Banking
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
