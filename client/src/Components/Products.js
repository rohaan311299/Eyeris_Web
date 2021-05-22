import React, { useState, useEffect } from 'react';

const Products = () => {
  let products = [];
  return (
    <div>
      <h1>Products:</h1>
      {products.map((product) => (
        <h1>{product.name}</h1>
      ))}
    </div>
  );
};

export default Products;
