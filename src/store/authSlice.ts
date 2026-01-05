import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types';

const storedAuth = localStorage.getItem('auth');
const initialState: AuthState = storedAuth 
  ? JSON.parse(storedAuth) 
  : { isAuthenticated: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
