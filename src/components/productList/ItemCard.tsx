import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../api/FetchApi";

interface ItemCardProps {
  product: Product;
}

const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
  const discountPercent = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <div className="relative bg-white border rounded-lg shadow-md p-4">
      <Link to={`/product/${product.id}`} className="block">
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercent}% OFF
          </span>
        )}

        {/* Product Image */}
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full h-48 object-cover rounded-t-lg"
        />

        {/* Title */}
        <h2 className="text-xl font-semibold mt-4">{product.title}</h2>

        {/* Price */}
        <div className="mt-2">
          <p className="text-green-600 text-lg font-bold">
            ${product.discountedPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Rating */}
        <p className="text-yellow-500 mt-1">⭐ {product.rating} / 5</p>
      </Link>
    </div>
  );
};

export default ItemCard;
