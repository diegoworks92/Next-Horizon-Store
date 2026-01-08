import Link from "next/link";
import styles from "./ChatLink.module.sass";

export const ChatLink = () => {
  return (
    <Link className={styles.ChatLink} href="/chat">
      <span>Chat</span>
      <img
        src="/svg/robot.svg"
        alt="Robot"
        style={{ width: "20px", marginLeft: "10px" }}
      />
    </Link>
  );
};
