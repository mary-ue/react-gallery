import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './token/tokenSlice';
import userReducer from './user/userSlice';
import photosReducer from './photos/photosSlice';

const store = configureStore({
  reducer: {
    tokenReducer,
    userReducer,
    photosReducer,
  }
});

export default store;