import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import memoryBooksSlice from "./memoryBooksSlice";

const store = configureStore({
  reducer: { user: userSlice.reducer, memoryBooks: memoryBooksSlice.reducer },
});

export default store;
