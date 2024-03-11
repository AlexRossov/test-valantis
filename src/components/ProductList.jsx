import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul className='listItems'>
          {products.map(product => (
            <li key={product.id}>
              <div>Id: {product.id}</div>
              <div>Name: {product.product}</div>
              <div>Price: {product.price}</div>
              <div>Brand: {product.brand}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
