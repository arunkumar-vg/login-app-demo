import { createSlice } from '@reduxjs/toolkit';

const loadAuthFromStorage = () => {
  try {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : { username: '', password: '', isAuth: false };
  } catch {
    return { username: '', password: '', isAuth: false };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthFromStorage(),
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.isAuth = true;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    updateRegion: (state, action) => {
      state.region = action.payload;
      localStorage.setItem('auth', JSON.stringify(state));
    }
  }
});

export const { login, updateRegion } = authSlice.actions;
export default authSlice.reducer;
