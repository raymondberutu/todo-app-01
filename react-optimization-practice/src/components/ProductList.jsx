import React from "react";
import ProductItem from "./ProductItem";

const ProductList = React.memo(({ products }) => {
  console.log("ProductList render");
  return (
    <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(4,1fr)", marginTop: "1rem" }}>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
});

export default ProductList;