import { createSlice } from '@reduxjs/toolkit';
import { likesRequestAsync, unlikesRequestAsync } from './likesAction';

const initialState = {
  likes: 0,
  userLiked: false,
  loading: false,
  error: '',
};

const likesSlice = createSlice({
  name: 'likes', 
  initialState,
  reducers: {
    setLikesCount: (state, action) => {
      state.likes = action.payload;
    },
    setUserLikes: (state, action) => {
      state.userLiked = action.payload;
    }, 
    removeLikesCount: (state) => {
      state.likes = 0;
    },
    removeUserLikes: (state, action) => {
      state.userLiked = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(likesRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(likesRequestAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          return;
        }
        state.likes = action.payload.photo.likes;
        state.userLiked = action.payload.photo.liked_by_user;
        state.loading = false;
      })
      .addCase(likesRequestAsync.rejected, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.error = action.error;
      })
      .addCase(unlikesRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(unlikesRequestAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          return;
        }
        state.likes = action.payload.photo.likes;
        state.userLiked = action.payload.photo.liked_by_user;
        state.loading = false;
      })
      .addCase(unlikesRequestAsync.rejected, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.error = action.error;
      });
  },
});

export const { setLikesCount, setUserLikes, removeLikesCount, removeUserLikes } = likesSlice.actions;

export default likesSlice.reducer;
