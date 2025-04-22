// src/App.tsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ProductDetail from "./components/pages/ProductDetail";
import CartPage from "./components/pages/CartPage";
import Navbar from "./components/NavBar";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast"; // 👈 Import Toaster

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>

        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </Router>
    </CartProvider>
  );
}

export default App;
