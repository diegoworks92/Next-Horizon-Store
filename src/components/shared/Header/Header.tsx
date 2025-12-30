import Link from "next/link";
import HeaderClient from "./HeaderClient";
import ShoppingCartClient from "../ShoppingCart/ShoppingCartClient";
import { validateAccessToken } from "../../../utils/auth/validateAccesToken";
import styles from "./Header.module.sass";

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
      <HeaderClient customer={customer} />
      <ShoppingCartClient />
    </header>
  );
};
