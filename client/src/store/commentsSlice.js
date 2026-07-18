import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const attachTokenToHeaders = (token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};

export const getComments = createAsyncThunk('comments/getComments', async (postId, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const options = attachTokenToHeaders(token);
    const response = await axios.get(`/api/comments/post/${postId}`, options);
    return response.data.comments;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createComment = createAsyncThunk('comments/createComment', async ({ text, postId }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const options = attachTokenToHeaders(token);
    const response = await axios.post('/api/comments', { text, post: postId }, options);
    return response.data.comment;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const options = attachTokenToHeaders(token);
    const response = await axios.delete(`/api/comments/${id}`, options);
    return response.data.comment;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
        state.error = null;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.unshift(action.payload);
        state.error = null;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = state.comments.filter(c => c.id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;