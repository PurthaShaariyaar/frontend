import { useState, useEffect } from 'react';
import './App.css';

const fetchProducts = async (page, limit = 5) => {
  try {
    const url = `https://dummyjson.com/products?_limit=${limit}&_page=${page}`;
    console.log("Fetching URL:", url); // Log URL to check
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched Data:", data); // Log fetched data to check structure
    return data.products; // Ensure this returns the products array
  } catch (error) {
    console.error(error);
    return [];
  }
}

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts(page);
      setProducts(data); // Now correctly set the products data
      setLoading(false);
    }

    loadProducts();
  }, [page]);

  return (
    <div>
      <h1>Products Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Item #</th>
            <th>Product</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setPage(prevPage => prevPage + 1);
        }}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
}

export default Products;
