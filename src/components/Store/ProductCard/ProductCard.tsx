import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.sass";

interface ProductCardInterface {
  product: ProductType;
}

export const ProductCard = ({ product }: ProductCardInterface) => {
  return (
    <Link
      href={`/product/${product.handle}?id=${product.id}`}
      className={styles.ProductCard__link}
    >
      <article className={styles.ProductCard}>
        <div className={styles.ProductCard__imageWrapper}>
          <Image
            src={product.image}
            alt={product.title}
            quality={80}
            height={320}
            width={320}
            loading="eager"
            className={styles.ProductCard__image}
          />
        </div>
        <div className={styles.ProductCard__info}>
          <h3>{product.title}</h3>
        </div>
        <span className={styles.ProductCard__priceTag}>
          {product.price !== null ? `${product.price}€` : ""}
        </span>
      </article>
    </Link>
  );
};
