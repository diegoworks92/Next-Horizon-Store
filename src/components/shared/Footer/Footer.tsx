import styles from "./Footer.module.sass";

export const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <a
        href="https://www.diegoworks.com/"
        className={styles.noUnderline}
        target="_blank"
        rel="noopener noreferrer"
      >
        DiegoWorks.com
      </a>
    </footer>
  );
};
