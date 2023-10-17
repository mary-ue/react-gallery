import { createSlice } from '@reduxjs/toolkit';
import { photosRequestAsync } from './photosAction';

const initialState = {
  loading: false,
  photos: [],
  page: 1,
  error: '',
}

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(photosRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(photosRequestAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          return;
        }
        state.loading = false;
        // state.data = state.data.length ?
        //   [...state.data, ...action.payload.data] : [...action.payload.data];
        state.photos = action.payload;
        state.page += 1;
      })
      .addCase(photosRequestAsync.rejected, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.error = action.error;
      })
  }
})

export default photosSlice.reducer;

