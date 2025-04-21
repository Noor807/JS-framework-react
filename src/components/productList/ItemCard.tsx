import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { Product } from "../../api/FetchApi"; // Import Product type

interface ItemCardProps {
  product: Product;
}

const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4">
      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {/* Product Title */}
        <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
        {/* Product Price */}
        <p className="text-lg font-bold text-green-600 mt-2">
          ${product.discountedPrice.toFixed(2)}
        </p>
        {/* Product Rating */}
        <p className="text-yellow-500 mt-1">⭐ {product.rating} / 5</p>
      </Link>
    </div>
  );
};

export default ItemCard;
