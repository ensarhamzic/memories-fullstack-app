import React, { useEffect, useState } from "react";
import styles from "./MemoryBooksPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Route, useRouteMatch } from "react-router";
import NewMemoryBook from "../../components/NewMemoryBook/NewMemoryBook";
import { Link } from "react-router-dom";
import { fetchMemoryBooks } from "../../store/memoryBooksAsyncActions";
import MemoryBookCard from "../../components/MemoryBookCard/MemoryBookCard";

function MemoryBooksPage() {
  const dispatchRedux = useDispatch();
  const { path, url } = useRouteMatch();
  const [loadingMemoryBooksError, setLoadingMemoryBooksError] = useState(null);
  const token = useSelector((state) => state.user.token);
  const memoryBooks = useSelector((state) => state.memoryBooks.myMemoryBooks);
  useEffect(() => {
    const getMemoryBooks = async () => {
      try {
        const response = await dispatchRedux(fetchMemoryBooks(token));
        if (response.error) {
          throw new Error(
            "Error happened while trying to get your memory books"
          );
        }
      } catch (e) {
        setLoadingMemoryBooksError(e.message);
      }
    };
    getMemoryBooks();
  }, [dispatchRedux, token]);
  return (
    <div>
      {loadingMemoryBooksError && (
        <p className={styles.error}>{loadingMemoryBooksError}</p>
      )}
      <Link className={styles.NewMemoryBookLink} to={`${url}/new`}>
        Create New Memory Book
      </Link>
      <Route exact path={`${path}/new`}>
        <NewMemoryBook />
      </Route>

      {memoryBooks &&
        memoryBooks.map((memBook) => (
          <MemoryBookCard
            key={memBook.id}
            title={memBook.title}
            location={memBook.location}
            viewers={memBook.viewers.length}
          />
        ))}
    </div>
  );
}

export default MemoryBooksPage;
