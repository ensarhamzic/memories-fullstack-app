import React, { useState, useEffect } from "react";
import styles from "./SharedMemoriesPage.module.css";
import Memories from "../../components/Memories/Memories";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function SharedMemoriesPage() {
  const token = useSelector((state) => state.user.token);
  const { memoryBookId } = useParams();
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memoriesError, setMemoriesError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getMemories = async () => {
      try {
        const response = await axios.get(
          `/memoryBooks/${memoryBookId}/memories`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        setMemories(response.data.memories);
      } catch (e) {
        setMemoriesError("Error while trying to get memories");
      }
      setIsLoading(false);
    };
    getMemories();
  }, [memoryBookId, token]);
  return (
    <div>
      {memoriesError && <p className={styles.error}>{memoriesError}</p>}
      {isLoading && <p className={styles.loading}>Loading...</p>}
      <div className={styles.memoriesDiv}>
        {memories && (
          <Memories className={styles.memories} memories={memories} />
        )}
      </div>
    </div>
  );
}

export default SharedMemoriesPage;
