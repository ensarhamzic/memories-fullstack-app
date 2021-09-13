import React, { useRef, useState } from "react";
import styles from "./MemoriesSidebar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { memoryBooksActions } from "../../store/memoryBooksSlice";
import axios from "axios";

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
    try {
      const response = await axios.post(
        `/memoryBooks/${memoryBookId}/viewers`,
        {
          emailOrUsername: nameRef.current.value,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      const newViewer = {
        _id: response.data.user._id,
        fullName: response.data.user.fullName,
        email: response.data.user.email,
        username: response.data.user.username,
      };
      dispatchRedux(
        memoryBooksActions.addViewer({ ...newViewer, memoryBookId })
      );
    } catch (e) {
      setAddViewerError(e.response.data.error);
    }
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
        ? viewers.map((viewer) => <p key={viewer._id}>{viewer.username}</p>)
        : "No viewers"}
    </div>
  );
}

export default MemoriesSidebar;
