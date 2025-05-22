import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast"; // ✅ Import toast

const CartPage: React.FC = () => {
  const { cart, updateCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, change: number) => {
    const updatedCart = cart.map((product) =>
      product.id === id
        ? { ...product, quantity: Math.max(1, product.quantity! + change) }
        : product
    );
    updateCart(updatedCart);
    toast.success("Quantity updated");
  };

  const handleRemoveProduct = (id: string) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    updateCart(updatedCart);
    toast.success("Item removed from cart");
  };

  const totalPrice = cart.reduce(
    (total, product) => total + product.discountedPrice * (product.quantity || 1),
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. Start shopping!</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((product) => (
              <li key={product.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={product.image.url}
                    alt={product.image.alt}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    ${product.discountedPrice.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="font-semibold text-lg">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={() => {
                if (cart.length === 0) {
                  toast.error("Your cart is empty!");
                  return;
                }
                toast.success("Proceeding to checkout...");
                navigate("/checkout");
              }}
              disabled={cart.length === 0}
              className={`py-2 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                cart.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
