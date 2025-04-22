import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // ✅ Import useCart

interface Review {
  id: string;
  username: string;
  rating: number;
  description: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
  tags: string[];
  reviews: Review[];
  quantity?: number; // ✅ Add optional quantity
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, updateCart } = useCart(); // ✅ Use cart context

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
        const data = await response.json();
        setProduct(data.data);
      } catch (err: any) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    updateCart(updatedCart);
    navigate("/cart");
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full md:w-1/2 object-cover rounded-lg shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-lg font-semibold text-red-600">
            ${product.discountedPrice.toFixed(2)}{" "}
            <span className="line-through text-gray-500 text-sm ml-2">
              ${product.price.toFixed(2)}
            </span>
          </p>
          <p className="text-yellow-500">⭐ {product.rating} / 5</p>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {product.reviews.map((review) => (
              <li key={review.id} className="border p-4 rounded-md shadow-sm">
                <p className="font-semibold">{review.username}</p>
                <p className="text-yellow-500">⭐ {review.rating}</p>
                <p className="text-gray-700">{review.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
