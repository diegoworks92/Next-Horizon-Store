import { ProductCard } from "../ProductCard";
import styles from "./ProductsWrapper.module.sass";

interface ProductsWrapperProps {
  products: ProductType[];
}

export const ProductsWrapper = ({ products }: ProductsWrapperProps) => {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className={styles.ProductsWrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
