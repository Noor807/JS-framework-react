// src/components/pages/HomePage.tsx
import React from "react";
import ProductList from "../productList"; // Adjust path if needed

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-5xl w-full text-center bg-white rounded-lg shadow-lg p-8">
        {/* Title Section */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Welcome to the Online Shop
        </h1>
        
        {/* Product List */}
        <ProductList />
      </div>
    </main>
  );
};

export default HomePage;
