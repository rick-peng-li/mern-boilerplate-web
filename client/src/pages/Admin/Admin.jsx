import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/usersSlice.js';
import { getPosts } from '../../store/postsSlice.js';
import { getNotifications } from '../../store/notificationsSlice.js';
import Loader from '../../components/Loader/Loader.jsx';
import './styles.css';

const Admin = () => {
  const { users, isLoading: usersLoading } = useSelector((state) => state.users);
  const { posts, isLoading: postsLoading } = useSelector((state) => state.posts);
  const { notifications, isLoading: notificationsLoading } = useSelector((state) => state.notifications);
  const { auth } = useSelector((state) => ({ auth: state.auth }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
    dispatch(getNotifications());
  }, [dispatch]);

  const stats = {
    totalUsers: users?.length || 0,
    adminUsers: users?.filter(u => u.role === 'ADMIN').length || 0,
    regularUsers: users?.filter(u => u.role === 'USER').length || 0,
    totalPosts: posts?.length || 0,
    totalLikes: posts?.reduce((sum, p) => sum + p.likes, 0) || 0,
    totalComments: posts?.reduce((sum, p) => sum + p.comments, 0) || 0,
    totalNotifications: notifications?.length || 0,
    unreadNotifications: notifications?.filter(n => !n.read).length || 0,
  };

  const isLoading = usersLoading || postsLoading || notificationsLoading;

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-description">Manage your application and monitor system statistics</p>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <div className="stat-value">{stats.totalUsers}</div>
                <div className="stat-label">Total Users</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👑</div>
              <div className="stat-info">
                <div className="stat-value">{stats.adminUsers}</div>
                <div className="stat-label">Admins</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👤</div>
              <div className="stat-info">
                <div className="stat-value">{stats.regularUsers}</div>
                <div className="stat-label">Regular Users</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-info">
                <div className="stat-value">{stats.totalPosts}</div>
                <div className="stat-label">Total Posts</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❤️</div>
              <div className="stat-info">
                <div className="stat-value">{stats.totalLikes}</div>
                <div className="stat-label">Total Likes</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💬</div>
              <div className="stat-info">
                <div className="stat-value">{stats.totalComments}</div>
                <div className="stat-label">Total Comments</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔔</div>
              <div className="stat-info">
                <div className="stat-value">{stats.totalNotifications}</div>
                <div className="stat-label">Total Notifications</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📩</div>
              <div className="stat-info">
                <div className="stat-value">{stats.unreadNotifications}</div>
                <div className="stat-label">Unread Notifications</div>
              </div>
            </div>
          </div>

          <div className="admin-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="action-grid">
              <Link to="/users" className="action-card">
                <div className="action-icon">👥</div>
                <div className="action-text">Manage Users</div>
              </Link>
              <Link to="/posts" className="action-card">
                <div className="action-icon">📝</div>
                <div className="action-text">Manage Posts</div>
              </Link>
              <Link to="/notifications" className="action-card">
                <div className="action-icon">🔔</div>
                <div className="action-text">View Notifications</div>
              </Link>
              <Link to="/settings" className="action-card">
                <div className="action-icon">⚙️</div>
                <div className="action-text">System Settings</div>
              </Link>
            </div>
          </div>

          <div className="admin-section">
            <h2 className="section-title">Recent Users</h2>
            <div className="users-list">
              {users?.slice(0, 5).map(user => (
                <div key={user._id} className="user-item">
                  <img src={user.avatar || '/images/default-avatar.png'} className="avatar" />
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-username">@{user.username}</div>
                  </div>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-section">
            <h2 className="section-title">Recent Posts</h2>
            <div className="posts-list">
              {posts?.slice(0, 5).map(post => (
                <div key={post._id} className="post-item">
                  <div className="post-info">
                    <div className="post-title">{post.title}</div>
                    <div className="post-meta">
                      ❤️ {post.likes} 💬 {post.comments}
                    </div>
                  </div>
                  <Link to={`/posts/${post._id}`} className="view-link">View</Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;