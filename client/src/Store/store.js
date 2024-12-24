import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "../Features/UserSlice";
import postReducer from "../Features/PostSlice";
import requestReducer from "../Features/RequestSlice";  // Import the new requestReducer

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postReducer,
    requests: requestReducer,  // Add the requestReducer to the store
  },
});
