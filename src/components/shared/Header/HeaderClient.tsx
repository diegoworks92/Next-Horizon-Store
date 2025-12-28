"use client";

import Link from "next/link";
import styles from "./Header.module.sass";

interface HeaderClientProps {
  customer: { firstName?: string } | null;
}

const HeaderClient = ({ customer }: HeaderClientProps) => {
  return (
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
    </div>
  );
};

export default HeaderClient;
