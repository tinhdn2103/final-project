import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "./reducers/listsSlice";
import authReducer from "./reducers/authSlice";
import movieReducer from "./reducers/movieSlice";
import notiReducer from "./reducers/notiSlice";

// Store
const store = configureStore({
  reducer: {
    listsReducer,
    authReducer,
    movieReducer,
    notiReducer,
  },
});

// Export
export default store;
