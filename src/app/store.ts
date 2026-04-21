import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/moviesSlice";
import themeReducer from "../features/movies/themeSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;