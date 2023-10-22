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
  reducers: {
    removePhotosData: (state) => {
      state.photos = [];
    },
    likePhoto: (state, action) => {
      const { photoId } = action.payload;
      const likedPhotoIndex = state.photos.findIndex((photo) => photo.id === photoId);

      if (likedPhotoIndex !== -1) {
        state.photos[likedPhotoIndex].likes += 1;
      }
    },
    unlikePhoto: (state, action) => {
      const { photoId } = action.payload;
      const likedPhotoIndex = state.photos.findIndex((photo) => photo.id === photoId);

      if (likedPhotoIndex !== -1) {
        state.photos[likedPhotoIndex].likes -= 1;
      }
    },
  },
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
        // state.photos = [...state.photos, ...action.payload];
        state.photos = state.photos.length ?
          [...state.photos, ...action.payload] : [...action.payload];
        // state.photos = action.payload;
        state.page += 1;
      })
      .addCase(photosRequestAsync.rejected, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.error = action.error;
      })
  }
})

export const { removePhotosData, likePhoto, unlikePhoto } = photosSlice.actions;

export default photosSlice.reducer;

