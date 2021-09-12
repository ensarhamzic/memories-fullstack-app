import React from "react";
import styles from "./Memories.module.css";
import MemoryCard from "../MemoryCard/MemoryCard";

function Memories({ memories }) {
  return (
    <div className={styles.memories}>
      {memories.map((memory) => (
        <MemoryCard
          key={memory._id}
          title={memory.title}
          description={memory.description}
          imageUrl={memory.image.url}
        />
      ))}
    </div>
  );
}

export default Memories;
