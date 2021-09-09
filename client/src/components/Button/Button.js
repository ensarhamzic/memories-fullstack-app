import React from "react";
import styles from "./Button.module.css";

function Button({ type, disabled, children }) {
  return (
    <button className={styles.button} type={type} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
