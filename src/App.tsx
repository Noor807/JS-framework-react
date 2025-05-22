// src/App.tsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ProductDetail from "./components/pages/ProductDetail";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage"; 
import SuccessPage from "./components/pages/SuccessPage";  // Updated the import
import Navbar from "./components/NavBar";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast"; 

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} /> 
            <Route path="/success" element={<SuccessPage />} />  {/* Updated route */}
          </Routes>
        </main>
        <Toaster position="top-center" reverseOrder={false} /> 
      </Router>
    </CartProvider>
  );
}

export default App;
