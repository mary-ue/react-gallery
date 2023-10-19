import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './token/tokenSlice';
import userReducer from './user/userSlice';
import photosReducer from './photos/photosSlice';
import singlePhotoReducer from './singlePhoto/singlePhotoSlice';

const store = configureStore({
  reducer: {
    tokenReducer,
    userReducer,
    photosReducer,
    singlePhotoReducer,
  }
});

export default store;