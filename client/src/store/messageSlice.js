import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios.js';

export const getMessages = createAsyncThunk('message/getMessages', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/messages');
    return response.data.messages;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addMessage = createAsyncThunk('message/addMessage', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/messages', formData);
    return response.data.message;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteMessage = createAsyncThunk('message/deleteMessage', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/messages/${id}`);
    return response.data.message;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const editMessage = createAsyncThunk('message/editMessage', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/api/messages/${id}`, formData);
    return response.data.message;
  } catch (err) {
    return rejectWithValue({ message: err.response?.data?.message || err.message, id });
  }
});

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearMessageError: (state, action) => {
      state.messages = state.messages.map(msg => 
        msg.id === action.payload ? { ...msg, error: null } : msg
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.unshift(action.payload);
        state.error = null;
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteMessage.pending, (state, action) => {
        state.isLoading = true;
        state.messages = state.messages.map(msg => 
          msg.id === action.meta.arg ? { ...msg, isLoading: true } : msg
        );
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = state.messages.filter(msg => msg.id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editMessage.pending, (state, action) => {
        state.isLoading = true;
        state.messages = state.messages.map(msg => 
          msg.id === action.meta.arg.id ? { ...msg, isLoading: true } : msg
        );
      })
      .addCase(editMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = state.messages.map(msg => 
          msg.id === action.payload.id ? action.payload : msg
        );
        state.error = null;
      })
      .addCase(editMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.messages = state.messages.map(msg => 
          msg.id === action.payload.id ? { ...msg, error: action.payload.message, isLoading: false } : msg
        );
      });
  },
});

export const { clearMessageError } = messageSlice.actions;
export default messageSlice.reducer;