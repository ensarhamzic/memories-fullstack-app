import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef(
  ({ id, title, type, placeholder, error }, ref) => {
    return (
      <div className={styles.inputDiv}>
        <label htmlFor={id}>{title}</label>
        <input ref={ref} type={type} placeholder={placeholder} id={id} />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);

export default Input;
