import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  error: null,
  tasks: [],
};

export const fetchTasks = createAsyncThunk('tasks/fetchContent', async () => {
  const res = await axios.get('/api/task');
  if (res.ok) {
    const data = await res.data;
    console.log('🚀 ~ file: taskState.js:14 ~ fetchTasks ~ data:', data);
    return data;
  }
});

export const taskReducer = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    deleteTask: (state, action) => {
      // console.log(state )
      const todo = state.todos.find((_todo) => _todo.id === action.payload);
      console.log(todo);
      if (todo) {
        todo.CompletedOn = new Date().toISOString();
      }
    },
    addTask: (state, action) => {
      state.todos.push({ ...action.payload, CompletedOn: null });
    },

    editTask: (state, action) => {
      state.todos.push({ ...action.payload, CompletedOn: null });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      console.log('fulfilled');
      state.todos = action.payload;
    }),
      builder.addCase(fetchTasks.rejected, (state, action) => {
        console.log('rejected', action);
        state.error = action.payload;
      }),
      builder.addCase(fetchTasks.pending, (state, action) => {
        console.log('pending');
        state.isLoading = true;
      });
  },
});

export const { deleteTask, addTask, editTask } = taskReducer.actions;

export default taskReducer.reducer;
