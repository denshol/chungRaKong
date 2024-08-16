// src/slices/user.ts
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  refreshToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    logout(state) {
      state.name = '';
      state.email = '';
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const {setUser, setAccessToken, logout} = userSlice.actions;
export default userSlice.reducer;
