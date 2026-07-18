import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, updatePost } from '../../store/postsSlice.js';
import Loader from '../../components/Loader/Loader.jsx';
import './styles.css';

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, isLoading } = useSelector((state) => state.posts);
  const { auth } = useSelector((state) => ({ auth: state.auth }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      formik.setFieldValue('title', post.title);
      formik.setFieldValue('content', post.content);
    }
  }, [post]);

  const handleSubmit = (values) => {
    dispatch(updatePost({ id, formData: values }));
    navigate(`/posts/${id}`);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: handleSubmit,
  });

  if (isLoading || !post) {
    return <Loader />;
  }

  if (!auth.isAuthenticated || !post.user || (auth.me?.id !== post.user.id && auth.me?.role !== 'ADMIN')) {
    return <p>You don't have permission to edit this post.</p>;
  }

  return (
    <div className="post-edit">
      <h1>Edit Post</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-div">
          <label>Title:</label>
          <input
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
        </div>
        <div className="input-div">
          <label>Content:</label>
          <textarea
            name="content"
            rows="10"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
        </div>
        <button type="submit" className="btn">
          Save Changes
        </button>
        <button type="button" onClick={() => navigate(`/posts/${id}`)} className="btn">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PostEdit;