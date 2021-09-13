import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myMemoryBooks: [],
  sharedMemoryBooks: [],
};

const memoryBooksSlice = createSlice({
  name: "memoryBooks",
  initialState,
  reducers: {
    addNewMemoryBook(state, action) {
      const newMemoryBook = {
        title: action.payload.title,
        location: action.payload.location,
        id: action.payload.id,
        viewers: action.payload.viewers,
      };
      state.myMemoryBooks.push(newMemoryBook);
    },
    fetchMemoryBooks(state, action) {
      const memoryBooks = action.payload.memoryBooks;
      for (const mb of memoryBooks) {
        state.myMemoryBooks.push({
          id: mb._id,
          title: mb.title,
          location: mb.location,
          viewers: mb.viewers,
        });
      }
    },
    clear(state, action) {
      state.myMemoryBooks = [];
      state.sharedMemoryBooks = [];
    },
    addViewer(state, action) {
      const { memoryBookId } = action.payload;
      state.myMemoryBooks
        .find((mb) => mb.id === memoryBookId)
        .viewers.push({
          _id: action.payload._id,
          fullName: action.payload.fullName,
          email: action.payload.email,
          username: action.payload.username,
        });
    },
  },
});

export const memoryBooksActions = memoryBooksSlice.actions;
export default memoryBooksSlice;
