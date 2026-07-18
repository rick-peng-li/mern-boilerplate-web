import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import messageSlice from './messageSlice.js';
import userSlice from './userSlice.js';
import usersSlice from './usersSlice.js';
import postsSlice from './postsSlice.js';
import commentsSlice from './commentsSlice.js';
import notificationsSlice from './notificationsSlice.js';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    message: messageSlice,
    user: userSlice,
    users: usersSlice,
    posts: postsSlice,
    comments: commentsSlice,
    notifications: notificationsSlice,
  },
});