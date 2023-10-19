import { createSlice } from '@reduxjs/toolkit';
import { singlePhotoRequestAsync } from './singlePhotoAction';

const initialState = {
  loading: false,
  photoData: {},
  error: '',
}

export const singlePhotoSlice = createSlice({
  name: 'singlePhoto',
  initialState,
  reducers: {
    removeSinglePhotoData: (state) => {
      state.photoData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(singlePhotoRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(singlePhotoRequestAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          return;
        }
        state.loading = false;
        state.photoData = action.payload;
      })
      .addCase(singlePhotoRequestAsync.rejected, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.error = action.error;
      })
  }
})

export const { removeSinglePhotoData } = singlePhotoSlice.actions;

export default singlePhotoSlice.reducer;

