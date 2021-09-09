import { createSlice } from "@reduxjs/toolkit";

const memoryBooksSlice = createSlice({
  name: "memoryBooks",
  initialState: {
    myMemoryBooks: [],
    sharedMemoryBooks: [],
  },
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
  },
});

export const memoryBooksActions = memoryBooksSlice.actions;
export default memoryBooksSlice;
