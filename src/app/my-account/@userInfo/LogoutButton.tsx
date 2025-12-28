"use client";
import React from "react";
import styles from "./LogoutButton.module.sass";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        // redirigir al user a la página de inicio
        window.location.href = "/";
      } else {
        console.error("Error logging out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={styles.LogoutButton__container}>
      <button onClick={handleLogout} className={styles.LogoutButton__button}>
        Log Out
      </button>
    </div>
  );
}
