"use client";
import { useState, useEffect } from "react";
import { useShoppingCart } from "../../../hooks/useShoppingCart";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { handleCreateCart } from "../../../actions";
import styles from "./ShoppingCart.module.sass";
import { FaShoppingCart } from "react-icons/fa";

export default function ShoppingCartClient() {
  const { cart } = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasItems = cart.length > 0;

  const handleOpen = () => {
    if (hasItems) setIsOpen(!isOpen);
  };

  const handleBuy = async () => {
    try {
      setIsBuying(true);
      const checkoutUrl = await handleCreateCart(cart);
      if (!checkoutUrl) throw new Error("Error creating checkout");
      window.localStorage.removeItem("cart");
      window.location.href = checkoutUrl;
    } catch (error) {
      console.log(error);
    } finally {
      setIsBuying(false);
    }
  };

  if (!mounted || !hasItems) return null;

  return (
    <div className={styles.ShoppingCart}>
      <span className={styles.ShoppingCart__counter}>{cart.length}</span>
      <button className={styles.ShoppingCart__cart} onClick={handleOpen}>
        <FaShoppingCart />
      </button>
      {isOpen && (
        <div className={styles.ShoppingCart__items}>
          {cart.map((item) => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
          <button
            onClick={handleBuy}
            className={styles.ShoppingCart__buyButton}
            disabled={isBuying}
          >
            Buy
          </button>
        </div>
      )}
    </div>
  );
}
