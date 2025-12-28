"use client";
import { handleLogin } from "../../../actions/index";
import styles from "./LoginForm.module.sass";

export const LoginForm = () => {
  const handleSubmit = async (event: {
    target: any;
    preventDefault: () => void;
  }) => {
    const formData = new FormData(event.target);
    event.preventDefault();
    await handleLogin(formData);
  };

  return (
    <div className={styles.NewAccountForm}>
      <h1 className={styles.NewAccountForm__title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.NewAccountForm__form}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
        />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" name="submit" value="Login" />
      </form>
    </div>
  );
};
