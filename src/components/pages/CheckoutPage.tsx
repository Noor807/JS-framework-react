import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast";

const CheckoutPage: React.FC = () => {
  const { cart, updateCart } = useCart();
  const navigate = useNavigate();

  // Simplified checkout details
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
  });

  const [billing, setBilling] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(false);

  // Total price calculation
  const totalPrice = cart.reduce(
    (total, product) => total + product.discountedPrice * (product.quantity || 1),
    0
  );

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, section: string) => {
    const { name, value } = e.target;
    if (section === "shipping") {
      setShipping((prev) => ({ ...prev, [name]: value }));
    } else if (section === "billing") {
      setBilling((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle checkout submission
  const handleCheckout = () => {
    // Validate shipping details
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.state || !shipping.zipCode || !shipping.country || !shipping.phone || !shipping.email) {
      toast.error("Please fill in all the shipping details.");
      return;
    }

    // If same billing address, use shipping info for billing
    const finalBilling = sameAsShipping ? shipping : billing;

    // Show success message and redirect to confirmation page
    toast.success("Order placed successfully!");
    updateCart([]); // Clear the cart after successful checkout

    // Redirect to success page with passed data
    navigate("/success", {
      state: { shipping, billing: finalBilling, cart, totalPrice },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Shipping and Billing Form */}
      <div className="space-y-6">
        {/* Shipping Form */}
        <div>
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <input type="text" placeholder="Full Name" name="name" value={shipping.name} onChange={(e) => handleChange(e, "shipping")} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Address" name="address" value={shipping.address} onChange={(e) => handleChange(e, "shipping")} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="City" name="city" value={shipping.city} onChange={(e) => handleChange(e, "shipping")} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="State" name="state" value={shipping.state} onChange={(e) => handleChange(e, "shipping")} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Zip Code" name="zipCode" value={shipping.zipCode} onChange={(e) => handleChange(e, "shipping")} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Country" name="country" value={shipping.country} onChange={(e) => handleChange(e, "shipping")} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Phone" name="phone" value={shipping.phone} onChange={(e) => handleChange(e, "shipping")} className="w-full p-2 border border-gray-300 rounded" />
          <input type="email" placeholder="Email" name="email" value={shipping.email} onChange={(e) => handleChange(e, "shipping")} className="w-full p-2 border border-gray-300 rounded" />
        </div>

        {/* Billing Form */}
        <div>
          <h2 className="text-xl font-semibold">Billing Information</h2>
          <input type="text" placeholder="Billing Address" name="address" value={billing.address} onChange={(e) => handleChange(e, "billing")} className="w-full p-2 border border-gray-300 rounded" />
          {/* Additional billing fields */}
        </div>

        <div className="flex items-center">
          <input type="checkbox" checked={sameAsShipping} onChange={() => setSameAsShipping(!sameAsShipping)} />
          <label className="ml-2">Billing address is the same as shipping</label>
        </div>

        {/* Submit Button */}
        <button onClick={handleCheckout} className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
