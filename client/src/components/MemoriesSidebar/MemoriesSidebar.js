import React, { useRef, useState } from "react";
import styles from "./MemoriesSidebar.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addViewerToMemoryBook,
  removeViewerFromMemoryBook,
} from "../../store/memoryBooksAsyncActions";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function MemoriesSidebar({ viewers, memoryBookId }) {
  const dispatchRedux = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [addViewerError, setAddViewerError] = useState(null);
  const nameRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setAddViewerError(null);
    if (!nameRef.current.value) {
      return;
    }
    const response = await dispatchRedux(
      addViewerToMemoryBook(token, memoryBookId, nameRef.current.value)
    );
    if (response.error) {
      setAddViewerError(response.error);
    }
  };

  const deleteHandler = (viewerId) => (e) => {
    dispatchRedux(removeViewerFromMemoryBook(token, memoryBookId, viewerId));
  };

  return (
    <div>
      <h4>Viewers</h4>
      <form className={styles.form} onSubmit={submitHandler}>
        <p>Share this memory book</p>
        <label htmlFor="name">Username or email</label> <br />
        <input ref={nameRef} type="text" id="name" required /> <br />
        <button type="submit">Add</button>
      </form>
      {addViewerError && <p className={styles.error}>{addViewerError}</p>}
      {viewers.length !== 0
        ? viewers.map((viewer) => (
            <div key={viewer._id} className={styles.viewerDiv}>
              <p>{viewer.username}</p>
              <div
                className={styles.deleteDiv}
                onClick={deleteHandler(viewer._id)}
              >
                <DeleteForeverIcon />
              </div>
            </div>
          ))
        : "No viewers"}
    </div>
  );
}

export default MemoriesSidebar;
