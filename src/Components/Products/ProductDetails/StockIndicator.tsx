
interface StockIndicatorProps {
  stock: number;
}

const StockIndicator = ({stock}:StockIndicatorProps) => {
  // Define stock status based on quantity
  let statusColor = "";
  let statusText = "";

  if (stock > 50) {
    statusColor = "bg-green-500";
    statusText = "In Stock";
  } else if (stock > 10) {
    statusColor = "bg-green-500";
    statusText = "In Stock";
  } else if (stock > 0) {
    statusColor = "bg-yellow-500";
    statusText = "Low Stock";
  } else {
    statusColor = "bg-red-500";
    statusText = "Out of Stock";
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
      <span className="text-sm font-medium">
        {statusText}
        {stock > 0 && stock <= 10 && ` (Only ${stock} left)`}
      </span>
    </div>
  );
};

export default StockIndicator;