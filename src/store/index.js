import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './token/tokenSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    tokenReducer,
    userReducer,
  }
});

export default store;