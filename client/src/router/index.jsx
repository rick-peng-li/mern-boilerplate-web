import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '../layout/Layout.jsx';
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import Register from '../pages/Register/Register.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import Users from '../pages/Users/Users.jsx';
import Admin from '../pages/Admin/Admin.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import Posts from '../pages/Posts/Posts.jsx';
import PostDetail from '../pages/Posts/PostDetail.jsx';
import PostEdit from '../pages/Posts/PostEdit.jsx';
import Notifications from '../pages/Notifications/Notifications.jsx';
import Settings from '../pages/Settings/Settings.jsx';

const RequireAuth = ({ children }) => {
  const { isAuthenticated, appLoaded } = useSelector((state) => state.auth);
  if (!appLoaded) return null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RequireAdmin = ({ children }) => {
  const { isAuthenticated, appLoaded, me } = useSelector((state) => state.auth);
  if (!appLoaded) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (me?.role !== 'ADMIN') return <Navigate to="/" />;
  return children;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/users', element: <RequireAuth><Users /></RequireAuth> },
      { path: '/admin', element: <RequireAdmin><Admin /></RequireAdmin> },
      { path: '/posts', element: <Posts /> },
      { path: '/posts/:id', element: <PostDetail /> },
      { path: '/posts/:id/edit', element: <RequireAuth><PostEdit /></RequireAuth> },
      { path: '/notifications', element: <RequireAuth><Notifications /></RequireAuth> },
      { path: '/settings', element: <RequireAuth><Settings /></RequireAuth> },
      { path: '/:username', element: <RequireAuth><Profile /></RequireAuth> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);