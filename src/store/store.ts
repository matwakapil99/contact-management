import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './employeesSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
