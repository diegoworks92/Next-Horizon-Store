"use server";

import Link from "next/link";
import { validateAccessToken } from "../../../utils/auth/validateAccesToken";
import styles from "./Header.module.sass";
import ShoppingCart from "../ShoppingCart";

export const Header = async () => {
  const customer = await validateAccessToken();

  return (
    <header className={styles.Header}>
      <nav>
        <ul className={styles.Header__list}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/store">Store</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.Header__user}>
        {customer?.firstName ? (
          <Link href="/my-account">Welcome {customer.firstName}</Link>
        ) : (
          <ul className={styles.Header__list}>
            <li>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign up</Link>
            </li>
          </ul>
        )}
        <ShoppingCart />
      </div>
    </header>
  );
};

/* 
.Header
display: flex
flex-flow: row nowrap
align-items: center
padding: 0 2rem

&__list
  display: flex
  flex-flow: row nowrap
  list-style: none
  column-gap: 2.5rem
  margin: 0 auto
  padding: 2rem
  justify-content: center
  & > li
    margin-right: 1rem
  &:last-child
    margin-right: 0
  & > li > a
    color: $text-color
    text-decoration: none
    font-size: 1.2rem
    font-weight: 400
    margin-right: 1rem
    &:hover
      color: $hover-color
&__user
  margin-left: auto
  display: flex
  flex-flow: row nowrap
  align-items: center
  column-gap: 1rem
  & > a
    color: $text-color
    text-decoration: none
    font-size: 1.2rem
    font-weight: 400
    display: flex
    align-items: center
    cursor: pointer
    &:hover
      color: $hover-color
 */
