import { createSlice } from "@reduxjs/toolkit";
import { userRequestAsync } from "./userAction";

const initialState = {
  loading: false,
  data: {},
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(userRequestAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          return;
        }
        state.data = action.payload;
      })
      // .addCase(userRequestAsync.rejected, (state, action) => {
      //   state.loading = false;
      //   if (!action.payload) return;
      //   state.error = action.error;
      // })
      .addCase(userRequestAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
          console.error('Error:', action.payload);
        } else {
          state.error = 'Unknown error occurred';
          console.error('Unknown error occurred');
        }
      })
  }
});

export default userSlice.reducer;
