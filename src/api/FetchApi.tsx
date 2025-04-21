// src/api/fetchApi.tsx

export interface ProductImage {
    url: string;
    alt: string;
  }
  
  export interface Review {
    id: string;
    username: string;
    rating: number;
    description: string;
  }
  
  export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discountedPrice: number;
    image: ProductImage;
    rating: number;
    tags: string[];
    reviews: Review[];
  }
  
  
  // src/api/fetchApi.tsx

  
  export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch("https://v2.api.noroff.dev/online-shop", {
      method:'GET',
      headers: {
     'Content-Type': 'application/json'
      }

    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
  
    const data = await res.json();
    console.log("Fetched products:", data.data); // ✅ Should log an array
  
    return data.data; // make sure this is an array
  }
  
  
  
  