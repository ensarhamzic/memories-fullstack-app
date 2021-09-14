import React from "react";
import styles from "./MemoryBookCard.module.css";

function MemoryBookCard({ title, location, counter, onMemoryBookClick, Icon }) {
  const clickHandler = () => {
    onMemoryBookClick();
  };
  return (
    <div className={styles.card} onClick={clickHandler}>
      <div className={styles.left}>
        <h2>{title}</h2>
        <p>{location}</p>
      </div>
      <div className={styles.right}>
        <p>
          <Icon /> {counter}
        </p>
      </div>
    </div>
  );
}

export default MemoryBookCard;
