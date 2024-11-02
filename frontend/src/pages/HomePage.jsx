import { useEffect } from "react";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  );
};
export default HomePage;
