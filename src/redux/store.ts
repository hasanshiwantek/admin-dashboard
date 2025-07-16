import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';
import authReducer from './slices/authSlice'
import configReducer from './slices/configSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    config: configReducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
