import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MemoryBooksPage.module.css";
import { useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router";
import NewMemoryBook from "../../components/NewMemoryBook/NewMemoryBook";
import { Link } from "react-router-dom";

function MemoryBooksPage() {
  const { path, url } = useRouteMatch();
  const token = useSelector((state) => state.user.token);
  const [memoryBooks, setMemoryBooks] = useState(null);
  useEffect(() => {
    const getMemoryBooks = async () => {
      try {
        const response = await axios.get("/memoryBooks", {
          headers: {
            authorization: token,
          },
        });
        setMemoryBooks(response.data.memoryBooks);
      } catch (e) {
        setMemoryBooks(null);
      }
    };
    getMemoryBooks();
  }, [token]);
  return (
    <div>
      <Link className={styles.NewMemoryBookLink} to={`${url}/new`}>
        Create New Memory Book
      </Link>
      <Route exact path={`${path}/new`}>
        <NewMemoryBook />
      </Route>
    </div>
  );
}

export default MemoryBooksPage;
