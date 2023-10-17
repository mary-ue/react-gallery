import { createSlice } from "@reduxjs/toolkit";
import { tokenRequestAsync } from "./tokenAction";

const initialState = {
  loading: false,
  token: '',
  error: '',
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokenFromLS: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tokenRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(tokenRequestAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          return;
        }
        state.token = action.payload;
        state.loading = false;
        localStorage.setItem('bearer', action.payload);
      })
      .addCase(tokenRequestAsync.rejected, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.error = action.error;
      })
  }
});

export const { setTokenFromLS, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
