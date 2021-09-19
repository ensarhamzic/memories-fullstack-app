import React from "react";
import styles from "./Empty.module.css";

function Empty({ children }) {
  return <p className={styles.empty}>{children}</p>;
}

export default Empty;
