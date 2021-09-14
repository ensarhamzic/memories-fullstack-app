import { memoryBooksActions } from "./memoryBooksSlice";
import axios from "axios";

export const addNewMemoryBook = (newMemoryBook, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/memoryBooks",
        {
          title: newMemoryBook.title,
          location: newMemoryBook.location,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      const newMB = response.data.data;
      dispatch(
        memoryBooksActions.addNewMemoryBook({
          id: newMB._id,
          title: newMB.title,
          location: newMB.location,
          viewers: newMB.viewers,
        })
      );
      return { success: true };
    } catch (e) {
      return { error: true };
    }
  };
};

export const fetchMemoryBooks = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/memoryBooks", {
        headers: {
          authorization: token,
        },
      });
      dispatch(
        memoryBooksActions.fetchMemoryBooks({
          memoryBooks: response.data.memoryBooks,
        })
      );
      return { success: true };
    } catch (e) {
      return { error: true };
    }
  };
};

export const fetchSharedMemoryBooks = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/memoryBooks/shared", {
        headers: {
          authorization: token,
        },
      });
      dispatch(
        memoryBooksActions.fetchSharedMemoryBooks({
          sharedMemoryBooks: response.data.sharedMemoryBooks,
        })
      );
      return { success: true };
    } catch (e) {
      return { error: true };
    }
  };
};
