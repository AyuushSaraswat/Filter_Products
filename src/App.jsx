import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("0-200");

  const fetchProducts = async () => {

    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setFilteredProducts(data.products); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
      const filtered = products.filter((prod) => {
      const priceRange = getPriceRange(prod.price);
      return priceRange === selectedPrice;
    });
    setFilteredProducts(filtered);
  }, [selectedPrice, products]);

  const getPriceRange = (price) => {

    if (price >= 0 && price <= 200) {
      return "0-200";
    } else if (price > 200 && price <= 300) {
      return "200-300";
    } else if (price > 300 && price <= 500) {
      return "300-500";
    } else if (price > 500 && price <= 1000) {
      return "500-1000";
    } else {
      return "Unknown";
    } 
  };

  return (
    <>

      <label htmlFor="price">Price:</label>
      <select
        name="price"
        id="price"
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
      >
        <option value="0-200">0-200</option>
        <option value="200-300">200-300</option>
        <option value="300-500">300-500</option>
        <option value="500-1000">500-1000</option>
      </select>

      {filteredProducts.length > 0 && (
        <div className="products">
          {filteredProducts.map((prod) => (
            <span key={prod.id}>
              {prod.title}
              <img src={prod.thumbnail} alt={prod.title} />
            </span>
          ))}
        </div>
      )}
    
    
    </>
  );
}

export default App;
