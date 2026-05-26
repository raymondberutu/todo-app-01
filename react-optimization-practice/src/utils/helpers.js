// simulasi komputasi berat
export const expensiveCalculation = (products, filter) => {
  console.log("⚠️ Komputasi berat berjalan...");
  let result = [...products];
  
  // delay simulasi
  for (let i = 0; i < 10000000; i++) {}  
  
  if (filter === "expensive") {
    result = result.filter(p => p.price > 100);
  }
  return result;
};