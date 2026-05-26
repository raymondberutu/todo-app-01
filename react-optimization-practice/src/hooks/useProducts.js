import { useState, useEffect, useCallback } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Menggunakan state untuk menyimpan URL agar bisa diubah saat retry
  const [url, setUrl] = useState("https://fakestoreapi.com/products-salah"); // Sengaja disalahkan (404)

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error ${res.status}: Gagal fetch data`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Fungsi retry yang sekaligus memperbaiki URL
  const retryFetch = () => {
    setUrl("https://fakestoreapi.com/products"); // URL yang benar
  };

  return { products, loading, error, retry: retryFetch };
};