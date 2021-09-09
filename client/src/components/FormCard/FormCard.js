import React from "react";
import styles from "./FormCard.module.css";

function FormCard({ title, onSubmit, children }) {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
}

export default FormCard;
