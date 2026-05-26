import React from "react";

const FilterBar = React.memo(({ filter, setFilter }) => {
  console.log("FilterBar render");
  return (
    <div style={{ marginBottom: "1rem" }}>
      <button 
        onClick={() => setFilter("all")} 
        style={{ background: filter === "all" ? "blue" : "gray", color: "white", padding: "0.5rem", marginRight: "0.5rem" }}>
        All
      </button>
      <button 
        onClick={() => setFilter("expensive")} 
        style={{ background: filter === "expensive" ? "blue" : "gray", color: "white", padding: "0.5rem" }}>
        Expensive (&gt;$100)
      </button>
    </div>
  );
});

export default FilterBar;