import React from "react";
import styles from "./FormError.module.css";

function FormError({ error }) {
  return <div>{error && <p className={styles.error}>{error}</p>}</div>;
}

export default FormError;
