import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, deletePost, likePost } from '../../store/postsSlice.js';
import { getComments, createComment, deleteComment } from '../../store/commentsSlice.js';
import Loader from '../../components/Loader/Loader.jsx';
import './styles.css';

const CommentItem = ({ comment, auth, onDelete }) => {
  return (
    <div className="comment-item">
      <Link to={`/${comment.user.username}`}>
        <img src={comment.user.avatar} className="avatar" />
      </Link>
      <div className="comment-content">
        <div className="comment-header">
          <Link to={`/${comment.user.username}`} className="name">
            {comment.user.name}
          </Link>
          <span className="time">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p>{comment.text}</p>
        {auth.isAuthenticated && (auth.me?.id === comment.user.id || auth.me?.role === 'ADMIN') && (
          <button onClick={() => onDelete(comment.id)} className="btn btn-danger">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, isLoading } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);
  const { auth } = useSelector((state) => ({ auth: state.auth }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getComments(id));
  }, [id]);

  const handleDeletePost = () => {
    dispatch(deletePost(id));
    navigate('/posts');
  };

  const handleLike = () => {
    dispatch(likePost(id));
  };

  const handleCreateComment = (values) => {
    dispatch(createComment({ text: values.text, postId: id }));
    formik.resetForm();
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: handleCreateComment,
  });

  if (isLoading || !post) {
    return <Loader />;
  }

  return (
    <div className="post-detail">
      <div className="post-header">
        <Link to={`/${post.user.username}`}>
          <img src={post.user.avatar} className="avatar" />
        </Link>
        <div>
          <Link to={`/${post.user.username}`} className="name">
            {post.user.name}
          </Link>
          <span className="username">@{post.user.username}</span>
          <span className="time">{moment(post.createdAt).fromNow()}</span>
        </div>
      </div>
      <h1>{post.title}</h1>
      <p className="post-content">{post.content}</p>
      <div className="post-meta">
        <button onClick={handleLike} className="btn btn-like">
          ❤️ {post.likes}
        </button>
        {auth.isAuthenticated && (auth.me?.id === post.user.id || auth.me?.role === 'ADMIN') && (
          <>
            <Link to={`/posts/${id}/edit`} className="btn">
              Edit
            </Link>
            <button onClick={handleDeletePost} className="btn btn-danger">
              Delete
            </button>
          </>
        )}
      </div>

      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        {auth.isAuthenticated && (
          <div className="comment-form">
            <form onSubmit={formik.handleSubmit}>
              <textarea
                name="text"
                rows="3"
                placeholder="Write a comment..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.text}
              />
              <button type="submit" className="btn">
                Comment
              </button>
            </form>
          </div>
        )}
        <div className="comments-list">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              auth={auth}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;