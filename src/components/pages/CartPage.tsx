import React, { useEffect, useState } from 'react';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    // Ensure each product has a quantity (default to 1)
    const normalizedCart = cartData.map((item: any) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(normalizedCart);
  }, []);

  // Update cart in state and localStorage
  const updateCart = (updatedCart: any[]) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart([...updatedCart]); // Force re-render with spread
  };

  // Remove a product
  const handleRemove = (productId: string) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    updateCart(updatedCart);
  };

  // Change quantity of a product
  const handleQuantityChange = (productId: string, change: number) => {
    const updatedCart = cart.map(product => {
      if (product.id === productId) {
        const newQuantity = Math.max(1, (product.quantity || 1) + change);
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-6">
          {cart.map(product => (
            <li
              key={product.id}
              className="flex items-center justify-between border p-4 rounded-md shadow-sm hover:bg-gray-100 transition duration-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image.url}
                  alt={product.image.alt}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{product.title}</h2>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  <p className="text-lg font-semibold text-red-600">
                    ${product.discountedPrice.toFixed(2)}{' '}
                    <span className="line-through text-gray-500 text-sm ml-2">
                      ${product.price.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="px-3 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400"
                >
                  -
                </button>
                <span className="text-lg">{product.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="px-3 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(product.id)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
