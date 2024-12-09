import React, { useEffect, useState } from "react";
import { fetchBrands, fetchProducts, Product } from "../services/firebaseServices";
import './ProductList.css'

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Tipado del estado
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        const fetchedBrands = await fetchBrands();
        setProducts(fetchedProducts);
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    loadData();
  }, []);

  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;

  return (
    <div>
      <h1>Lista de Productos</h1>
      <label htmlFor="brand-select">Filtrar por marca:</label>
      <select
        id="brand-select"
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
      >
        <option value="">Todas</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <p>Marca: {product.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
