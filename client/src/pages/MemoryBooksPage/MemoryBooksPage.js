import React, { useEffect, useState } from "react";
import styles from "./MemoryBooksPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router";
import NewMemoryBook from "../../components/NewMemoryBook/NewMemoryBook";
import { fetchMemoryBooks } from "../../store/memoryBooksAsyncActions";
import MemoryBookCard from "../../components/MemoryBookCard/MemoryBookCard";
import FormTogglerButton from "../../components/FormTogglerButton/FormTogglerButton";
import GroupIcon from "@material-ui/icons/Group";

let isInitial = true;

function MemoryBooksPage() {
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const [formVisible, setFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMemoryBooksError, setLoadingMemoryBooksError] = useState(null);
  const token = useSelector((state) => state.user.token);
  const memoryBooks = useSelector((state) => state.memoryBooks.myMemoryBooks);
  useEffect(() => {
    if (isInitial) {
      setIsLoading(true);
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
        setIsLoading(false);
      };
      getMemoryBooks();
      isInitial = false;
    }
  }, [token, dispatchRedux]);

  const formToggler = () => {
    if (history.location.pathname === "/memory-books") {
      history.replace("/memory-books/new");
    } else {
      history.replace("/memory-books");
    }
    setFormVisible((prev) => !prev);
  };

  const memoryBookClickHandler = (id) => (e) => {
    history.push(`/memory-books/${id}/memories`);
  };

  return (
    <div>
      {loadingMemoryBooksError && (
        <p className={styles.error}>{loadingMemoryBooksError}</p>
      )}
      <Switch>
        <Route path={`/memory-books/new`}>
          <NewMemoryBook />
        </Route>
      </Switch>

      <FormTogglerButton
        onClick={formToggler}
        closedText="Create New Memory Book"
        openedText="Close Form"
        formIsVisible={formVisible}
      />

      {isLoading && <p className={styles.loading}>Loading...</p>}

      {memoryBooks &&
        memoryBooks.map((memBook) => (
          <MemoryBookCard
            onMemoryBookClick={memoryBookClickHandler(memBook.id)}
            key={memBook.id}
            title={memBook.title}
            location={memBook.location}
            counter={memBook.viewers.length}
            Icon={GroupIcon}
          />
        ))}
    </div>
  );
}

export default MemoryBooksPage;
