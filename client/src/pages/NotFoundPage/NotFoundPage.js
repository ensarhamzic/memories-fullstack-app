import React from "react";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>404</h1>
        <h2>This page is not found</h2>
      </div>
    </div>
  );
}

export default NotFoundPage;
