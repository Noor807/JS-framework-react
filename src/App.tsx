// src/App.tsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ProductDetail from "./components/pages/ProductDetail";
import CartPage from "./components/pages/CartPage";
import Navbar from "./components/NavBar";
import { CartProvider } from "./context/CartContext"; // 👈 Import the provider

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
      </Router>
    </CartProvider>
  );
}

export default App;
