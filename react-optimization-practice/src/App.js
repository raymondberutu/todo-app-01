import React, { useState, useMemo, useTransition } from "react";
import { useProducts } from "./hooks/useProducts";
import { expensiveCalculation } from "./utils/helpers";
import ProductList from "./components/ProductList";
import FilterBar from "./components/FilterBar";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const { products, loading, error, retry } = useProducts();
  const [filter, setFilter] = useState("all");
  
  // Optimasi Lanjutan: Menggunakan useTransition untuk interaksi filter
  const [isPending, startTransition] = useTransition();

  const handleFilter = (newFilter) => {
    startTransition(() => {
      setFilter(newFilter);
    });
  };

  // ✅ useMemo: hanya hitung ulang jika products atau filter berubah
  const filteredProducts = useMemo(() => {
    return expensiveCalculation(products, filter);
  }, [products, filter]);

  console.log("App render");

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Product Dashboard</h1>
      
      {/* Menangani Error Network Async */}
      {error && (
        <div style={{ padding: "1rem", backgroundColor: "#ffebee", color: "#c62828", marginBottom: "1rem" }}>
          <p><strong>Error Network:</strong> {error}</p>
          <button onClick={retry} style={{ padding: "0.5rem", cursor: "pointer" }}>Retry Fetch dengan URL Benar</button>
        </div>
      )}

      {loading ? (
        <div>Loading API Data...</div>
      ) : (
        <>
          <FilterBar filter={filter} setFilter={handleFilter} />
          
          {/* Indikator visual saat useTransition sedang memproses state (pending) */}
          {isPending && <p style={{ color: "orange" }}>Memproses filter...</p>}
          
          {/* Error Boundary untuk menangkap Render Error di dalam List */}
          <ErrorBoundary>
            <ProductList products={filteredProducts} />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
}

export default App;