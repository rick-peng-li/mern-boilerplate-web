import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../store/postsSlice.js';
import { getUsers } from '../../store/usersSlice.js';
import { getMessages } from '../../store/messageSlice.js';
import { reseedDatabase } from '../../store/authSlice.js';
import MessageList from '../../components/MessageList/MessageList';
import MessageForm from '../../components/MessageForm/MessageForm';
import Loader from '../../components/Loader/Loader';
import './styles.css';

const FeatureCard = ({ icon, title, description, link }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {link && <Link to={link} className="feature-link">Learn more →</Link>}
    </div>
  );
};

const StatsCard = ({ label, value, color }) => {
  return (
    <div className="stats-card">
      <div className="stats-value" style={{ color }}>{value}</div>
      <div className="stats-label">{label}</div>
    </div>
  );
};

const RecentPost = ({ post }) => {
  if (!post.user) return null;
  
  return (
    <div className="recent-post">
      <Link to={`/posts/${post._id}`} className="post-title">
        {post.title}
      </Link>
      <p className="post-excerpt">{post.content.substring(0, 80)}...</p>
      <div className="post-meta">
        <Link to={`/${post.user.username}`} className="post-author">
          <img src={post.user.avatar} className="author-avatar" />
          {post.user.name}
        </Link>
        <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

const ActiveUser = ({ user }) => {
  return (
    <div className="active-user">
      <Link to={`/${user.username}`}>
        <img src={user.avatar} className="user-avatar" alt={user.name} />
      </Link>
      <div className="user-info">
        <Link to={`/${user.username}`} className="user-name">{user.name}</Link>
        <span className="user-username">@{user.username}</span>
      </div>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);
  const messages = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getUsers());
      dispatch(getMessages());
    }
  }, [auth.isAuthenticated, dispatch]);

  const handleReseed = () => {
    dispatch(reseedDatabase());
  };

  const recentPosts = posts.posts?.filter(post => post.user).slice(0, 3) || [];
  const activeUsers = users.users?.slice(0, 4) || [];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to MERN Boilerplate</h1>
        <p className="hero-subtitle">A modern full-stack web application built with React, Express, MongoDB, and Node.js</p>
        <div className="hero-buttons">
          {!auth.isAuthenticated ? (
            <>
              <Link to="/login" className="btn btn-primary">Get Started</Link>
              <Link to="/register" className="btn btn-default">Sign Up Free</Link>
            </>
          ) : (
            <Link to="/posts" className="btn btn-primary">Explore Posts</Link>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          <FeatureCard
            icon="📝"
            title="Post Management"
            description="Create, edit, and manage posts with rich content support. Share your thoughts with the community."
            link="/posts"
          />
          <FeatureCard
            icon="💬"
            title="Real-time Messages"
            description="Send and receive messages in real-time. Stay connected with other users."
            link="/"
          />
          <FeatureCard
            icon="👥"
            title="User Profiles"
            description="Create and customize your profile. Upload avatars and share your bio."
            link={`/${auth.me?.username || ''}`}
          />
          <FeatureCard
            icon="🔔"
            title="Notifications"
            description="Get notified about likes, comments, and mentions. Never miss an update."
            link="/notifications"
          />
          <FeatureCard
            icon="🔒"
            title="Secure Authentication"
            description="Built-in JWT authentication with support for Google and Facebook login."
            link="/login"
          />
          <FeatureCard
            icon="⚙️"
            title="Settings"
            description="Customize your account settings. Manage preferences and privacy."
            link="/settings"
          />
        </div>
      </div>

      <div className="stats-section">
        <StatsCard label="Total Posts" value={posts.posts?.length || 0} color="#1890ff" />
        <StatsCard label="Active Users" value={users.users?.length || 0} color="#52c41a" />
        <StatsCard label="Messages" value={messages.messages?.length || 0} color="#faad14" />
        <StatsCard label="Comments" value="0" color="#722ed1" />
      </div>

      <div className="content-grid">
        <div className="left-column">
          <div className="card">
            <h3 className="card-title">Recent Posts</h3>
            {posts.isLoading ? (
              <Loader />
            ) : recentPosts.length > 0 ? (
              recentPosts.map((post) => <RecentPost key={post._id} post={post} />)
            ) : (
              <p className="empty-state">No posts yet. Be the first to publish!</p>
            )}
            <Link to="/posts" className="view-all">View all posts →</Link>
          </div>

          {auth.isAuthenticated && (
            <>
              <div className="card">
                <h3 className="card-title">Send a Message</h3>
                <MessageForm />
              </div>

              <div className="card">
                <h3 className="card-title">Latest Messages</h3>
                {messages.isLoading ? (
                  <Loader />
                ) : (
                  <MessageList />
                )}
              </div>
            </>
          )}
        </div>

        <div className="right-column">
          {auth.isAuthenticated && (
            <div className="card">
              <h3 className="card-title">Active Users</h3>
              {users.isLoading ? (
                <Loader />
              ) : activeUsers.length > 0 ? (
                activeUsers.map((user) => <ActiveUser key={user._id} user={user} />)
              ) : (
                <p className="empty-state">No users found.</p>
              )}
              <Link to="/users" className="view-all">View all users →</Link>
            </div>
          )}

          <div className="card info-card">
            <h3 className="card-title">About This Project</h3>
            <p>This is a MERN stack boilerplate that provides a solid foundation for building modern web applications.</p>
            <ul>
              <li>React 18 with Vite</li>
              <li>Redux Toolkit for state management</li>
              <li>React Router v6</li>
              <li>Express.js backend</li>
              <li>MongoDB database</li>
              <li>Docker containerization</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title">Quick Links</h3>
            <div className="quick-links">
              <Link to="/posts">📝 Posts</Link>
              <Link to="/users">👥 Users</Link>
              <Link to="/notifications">🔔 Notifications</Link>
              <Link to="/settings">⚙️ Settings</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="reseed-section">
        <span>Need to reset the database?</span>
        <button onClick={handleReseed} className="btn btn-secondary">
          Reseed Database
        </button>
      </div>
    </div>
  );
};

export default Home;