import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { shipping, billing, cart, totalPrice } = location.state || {};

  if (!shipping || !billing || !Array.isArray(cart) || !totalPrice) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Oops!</h1>
        <p className="text-gray-600">Something went wrong. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Order Confirmed </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase! Your order has been placed successfully.
        </p>

        {/* Info sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Info */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
            <p><strong>Name:</strong> {shipping.name}</p>
            <p><strong>Address:</strong> {shipping.address}</p>
            <p>{shipping.city}, {shipping.state} {shipping.zipCode}</p>
            <p>{shipping.country}</p>
            <p><strong>Phone:</strong> {shipping.phone}</p>
            <p><strong>Email:</strong> {shipping.email}</p>
          </div>

          {/* Billing Info */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Billing Information</h2>
            <p><strong>Address:</strong> {billing.address}</p>
            <p>{billing.city}, {billing.state} {billing.zipCode}</p>
            <p>{billing.country}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <ul className="space-y-2 text-gray-800">
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between items-center">
                <span>{product.title} (x{product.quantity})</span>
                <span>${(product.discountedPrice * product.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xl font-bold text-right">Total: ${totalPrice.toFixed(2)}</p>
        </div>

        {/* Confirmation Text */}
        <div className="mt-6 text-sm text-gray-600">
          <p>Your order is being processed. You’ll receive a confirmation email shortly.</p>
        </div>

        {/* Navigation Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
