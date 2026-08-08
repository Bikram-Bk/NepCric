import { formatters } from "@/utils/formatters";

const OrderStatusBadge = ({ status }) => {
  const statusColor = formatters.orderStatusColor(status);
  const statusLabel = formatters.orderStatus(status);

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full"
      style={{
        backgroundColor: `${statusColor}20`,
        color: statusColor,
        border: `1px solid ${statusColor}40`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: statusColor }}
      />
      {statusLabel}
    </span>
  );
};

export default OrderStatusBadge;
