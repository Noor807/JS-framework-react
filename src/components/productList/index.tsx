// src/components/ProductList/index.tsx
import React, { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../../api/FetchApi';
import ItemCard from './ItemCard';
import SearchAndSort from './SearchAndSort';  // Correct the import path

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('title_asc');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Error loading products');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
  };

  // Filter products by search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products based on selected sort option
  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case 'title_asc':
        return a.title.localeCompare(b.title); // A → Z by title
      case 'title_desc':
        return b.title.localeCompare(a.title); // Z → A by title
      case 'price_asc':
        return a.price - b.price; // Low to High by price
      case 'price_desc':
        return b.price - a.price; // High to Low by price
      case 'rating_asc':
        return a.rating - b.rating; // Low to High by rating
      case 'rating_desc':
        return b.rating - a.rating; // High to Low by rating
      default:
        return 0;
    }
  });

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <SearchAndSort 
        onSearchChange={handleSearchChange}  // Pass correct prop
        onSortChange={handleSortChange}  // Pass correct prop
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {sortedProducts.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
