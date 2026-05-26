import React from "react";

const ProductItem = React.memo(({ product }) => {
  console.log(`ProductItem ${product.id} render`);
  
  // Hapus komentar di bawah untuk menguji Error Boundary (Tugas Praktek 2)
  // if (product.price > 200) throw new Error("Simulasi error untuk produk mahal!");

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <img src={product.image} alt={product.title} width={100} height={100} />
      <h4>{product.title.slice(0, 20)}...</h4>
      <p>${product.price}</p>
    </div>
  );
});

export default ProductItem;