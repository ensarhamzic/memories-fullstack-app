import React, { useEffect, useState } from "react";
import { fetchSharedMemoryBooks } from "../../store/memoryBooksAsyncActions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SharedMemoryBooksPage.module.css";
import ImageIcon from "@material-ui/icons/Image";
import MemoryBookCard from "../../components/MemoryBookCard/MemoryBookCard";
import { useHistory } from "react-router-dom";

let isInitial = true;

function SharedMemoryBooksPage() {
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [loadingSharedMemoryBooksError, setLoadingSharedMemoryBooksError] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sharedMemoryBooks = useSelector(
    (state) => state.memoryBooks.sharedMemoryBooks
  );
  useEffect(() => {
    if (isInitial) {
      setIsLoading(true);
      const getMemoryBooks = async () => {
        try {
          const response = await dispatchRedux(fetchSharedMemoryBooks(token));
          if (response.error) {
            throw new Error(
              "Error happened while trying to get your memory books"
            );
          }
        } catch (e) {
          setLoadingSharedMemoryBooksError(e.message);
        }
        setIsLoading(false);
      };
      getMemoryBooks();
      isInitial = false;
    }
  }, [token, dispatchRedux]);

  const sharedMemoryBookClickHandler = (id) => (e) => {
    // history.push(`/memory-books/${id}/memories`);
    console.log(id);
  };

  return (
    <div>
      {loadingSharedMemoryBooksError && (
        <p className={styles.error}>{loadingSharedMemoryBooksError}</p>
      )}
      {isLoading && <p className={styles.loading}>Loading...</p>}

      {sharedMemoryBooks &&
        sharedMemoryBooks.map((memBook) => (
          <MemoryBookCard
            onMemoryBookClick={sharedMemoryBookClickHandler(memBook.id)}
            key={memBook.id}
            title={memBook.title}
            location={memBook.location}
            counter={memBook.memories}
            Icon={ImageIcon}
          />
        ))}
    </div>
  );
}

export default SharedMemoryBooksPage;
