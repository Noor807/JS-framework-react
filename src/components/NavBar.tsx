import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, ShoppingCart, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalQuantity = cart.reduce((sum: number, item: any) => {
        return sum + (item.quantity || 1);
      }, 0);
      setCartCount(totalQuantity);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <nav className="bg-[#001f3f] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
          🛍️ <span className="hidden sm:inline">Shop</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-12">
          <Link
            to="/"
            className="text-white hover:bg-white hover:text-[#001f3f] transition duration-300 px-3 py-1 rounded-md flex items-center gap-1"
          >
            <Home size={20} />
            Home
          </Link>
          <Link
            to="/cart"
            className="relative text-white hover:bg-white hover:text-[#001f3f] transition duration-300 px-3 py-1 rounded-md flex items-center gap-1"
          >
            <ShoppingCart size={20} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-4 border-t border-blue-800 bg-[#001f3f]">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className=" text-white hover:bg-white hover:text-[#001f3f] transition px-3 py-2 rounded-md flex items-center gap-2"
          >
            <Home size={20} />
            Home
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className=" text-white hover:bg-white hover:text-[#001f3f] transition px-3 py-2 rounded-md flex items-center gap-2 relative"
          >
            <ShoppingCart size={20} />
            Cart
            {cartCount > 0 && (
              <span className="absolute left-20 -top-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
