import { MapPin, Edit, Trash2, StarOff } from "lucide-react";

const AddressList = ({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <MapPin
          size={40}
          className="mx-auto mb-3"
          style={{ color: "#C4954A" }}
        />
        <p
          className="text-sm"
          style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
        >
          No addresses saved yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="bg-white p-4 rounded-sm border transition-all duration-200 hover:shadow-md"
          style={{
            borderColor: address.isDefault ? "#C4954A" : "#D0C9BA",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-semibold"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#1C1A17" }}
                >
                  {address.label}
                </span>
                {address.isDefault && (
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "#C4954A20",
                      color: "#C4954A",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Default
                  </span>
                )}
              </div>
              <p
                className="text-sm mt-1"
                style={{ color: "#7A7468", fontFamily: "Outfit, sans-serif" }}
              >
                {address.firstName} {address.lastName}
                <br />
                {address.address}
                <br />
                {address.city}, {address.state} {address.zipCode}
                <br />
                {address.country}
              </p>
            </div>

            <div className="flex gap-2 ml-4">
              {!address.isDefault && (
                <button
                  onClick={() => onSetDefault(address.id)}
                  className="p-2 rounded-full transition-colors hover:bg-[#EDE8DE]"
                  title="Set as default"
                >
                  <StarOff size={16} style={{ color: "#7A7468" }} />
                </button>
              )}
              <button
                onClick={() => onEdit(address)}
                className="p-2 rounded-full transition-colors hover:bg-[#EDE8DE]"
                title="Edit address"
              >
                <Edit size={16} style={{ color: "#7A7468" }} />
              </button>
              <button
                onClick={() => onDelete(address.id)}
                className="p-2 rounded-full transition-colors hover:bg-[#EDE8DE]"
                title="Delete address"
              >
                <Trash2 size={16} style={{ color: "#7A7468" }} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
