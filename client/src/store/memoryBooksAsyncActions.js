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

export const addViewerToMemoryBook = (token, memoryBookId, emailOrUsername) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/memoryBooks/${memoryBookId}/viewers`,
        {
          emailOrUsername,
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
      dispatch(memoryBooksActions.addViewer({ ...newViewer, memoryBookId }));
      return { success: true };
    } catch (e) {
      return { error: e.response.data.error };
    }
  };
};

export const removeViewerFromMemoryBook = (token, memoryBookId, viewerId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/memoryBooks/${memoryBookId}/viewers/${viewerId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(memoryBooksActions.removeViewer({ memoryBookId, viewerId }));
    } catch (e) {}
  };
};
