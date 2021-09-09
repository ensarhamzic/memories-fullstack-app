import React from "react";
import styles from "./MemoryBookCard.module.css";
import GroupIcon from "@material-ui/icons/Group";

function MemoryBookCard({ title, location, viewers }) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <h2>{title}</h2>
        <p>{location}</p>
      </div>
      <div className={styles.right}>
        <p>
          <GroupIcon /> {viewers}
        </p>
      </div>
    </div>
  );
}

export default MemoryBookCard;
