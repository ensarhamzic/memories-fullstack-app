import React from "react";
import styles from "./MemoryCard.module.css";

function MemoryCard({ title, description, imageUrl }) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={imageUrl} alt="Memory" />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default MemoryCard;
