import React, { useEffect, useState } from "react";
import styles from "./MemoryBooksPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Route, useHistory } from "react-router";
import NewMemoryBook from "../../components/NewMemoryBook/NewMemoryBook";
import { Link } from "react-router-dom";
import { fetchMemoryBooks } from "../../store/memoryBooksAsyncActions";
import MemoryBookCard from "../../components/MemoryBookCard/MemoryBookCard";
import AddBoxIcon from "@material-ui/icons/AddBox";

function MemoryBooksPage() {
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const [formVisible, setFormVisible] = useState(false);
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

  let buttonText = null;
  if (formVisible) {
    buttonText = `Close Form`;
  } else {
    buttonText = ["Create New Memory Book", <AddBoxIcon />];
  }

  const formToggler = () => {
    if (history.location.pathname === "/memory-books") {
      history.replace("/memory-books/new");
    } else {
      history.replace("/memory-books");
    }
    setFormVisible((prev) => !prev);
  };

  return (
    <div>
      {loadingMemoryBooksError && (
        <p className={styles.error}>{loadingMemoryBooksError}</p>
      )}
      <Route exact path={`/memory-books/new`}>
        <NewMemoryBook />
      </Route>

      <button className={styles.formToggleButton} onClick={formToggler}>
        {buttonText}
      </button>

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
