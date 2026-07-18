import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, createPost, deletePost, likePost } from '../../store/postsSlice.js';
import Loader from '../../components/Loader/Loader.jsx';
import './styles.css';

const PostCard = ({ post, auth, onDelete, onLike }) => {
  const canEdit = auth.isAuthenticated && post.user && (auth.me?.id === post.user.id || auth.me?.role === 'ADMIN');

  return (
    <div className="post-card">
      <div className="post-header">
        {post.user ? (
          <Link to={`/${post.user.username}`}>
            <img src={post.user.avatar || '/images/default-avatar.png'} className="avatar" />
          </Link>
        ) : (
          <div className="avatar-placeholder">
            <span className="avatar-text">?</span>
          </div>
        )}
        <div>
          {post.user ? (
            <>
              <Link to={`/${post.user.username}`} className="name">
                {post.user.name}
              </Link>
              <span className="username">@{post.user.username}</span>
            </>
          ) : (
            <span className="name">Deleted User</span>
          )}
          <span className="time">{moment(post.createdAt).fromNow()}</span>
        </div>
      </div>
      <h3>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h3>
      <p className="post-content">{post.content.substring(0, 100)}...</p>
      <div className="post-meta">
        <button onClick={() => onLike(post._id)} className="btn btn-like">
          ❤️ {post.likes}
        </button>
        <span className="comments-count">💬 {post.comments} comments</span>
        {canEdit && (
          <>
            <Link to={`/posts/${post._id}/edit`} className="btn">
              Edit
            </Link>
            <button onClick={() => onDelete(post._id)} className="btn btn-danger">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { auth } = useSelector((state) => ({ auth: state.auth }));
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleCreatePost = (values) => {
    dispatch(createPost(values));
    formik.resetForm();
    setShowForm(false);
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handleLike = (id) => {
    dispatch(likePost(id));
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: handleCreatePost,
  });

  const filteredPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const stats = {
    total: posts?.length || 0,
    likes: posts?.reduce((sum, p) => sum + p.likes, 0) || 0,
    comments: posts?.reduce((sum, p) => sum + p.comments, 0) || 0,
  };

  return (
    <div className="posts-page">
      <div className="page-header">
        <h1 className="page-title">Posts</h1>
        <p className="page-description">Browse and create posts in the community</p>
      </div>

      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Posts</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.likes}</div>
          <div className="stat-label">Total Likes</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.comments}</div>
          <div className="stat-label">Total Comments</div>
        </div>
      </div>

      <div className="posts-header">
        {auth.isAuthenticated && (
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : 'Create New Post'}
          </button>
        )}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {showForm && auth.isAuthenticated && (
        <div className="post-form card">
          <h3>Create New Post</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                name="title"
                placeholder="Post title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <textarea
                name="content"
                rows="5"
                placeholder="Write your post content..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="posts-grid">
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <p>No posts yet. Be the first to publish!</p>
              {auth.isAuthenticated && (
                <button onClick={() => setShowForm(true)} className="btn btn-primary">
                  Create Your First Post
                </button>
              )}
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                auth={auth}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;