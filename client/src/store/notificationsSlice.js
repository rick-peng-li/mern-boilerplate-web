import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios.js';

export const getNotifications = createAsyncThunk('notifications/getNotifications', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/notifications');
    return response.data.notifications;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const getUnreadCount = createAsyncThunk('notifications/getUnreadCount', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/notifications/unread');
    return response.data.count;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const markAllRead = createAsyncThunk('notifications/markAllRead', async (_, { rejectWithValue }) => {
  try {
    await axios.put('/api/notifications/mark-all-read');
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteNotification = createAsyncThunk('notifications/deleteNotification', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/notifications/${id}`);
    return response.data.notification;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
        state.error = null;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })
      .addCase(markAllRead.fulfilled, (state) => {
        state.notifications = state.notifications.map(n => ({ ...n, read: true }));
        state.unreadCount = 0;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(n => n.id !== action.payload.id);
      });
  },
});

export default notificationsSlice.reducer;