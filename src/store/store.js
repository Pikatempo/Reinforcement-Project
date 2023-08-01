import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskState.js';

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});
