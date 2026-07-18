import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserWithEmail } from '../../store/authSlice.js';
import { FACEBOOK_AUTH_LINK, GOOGLE_AUTH_LINK } from '../../constants';
import { loginSchema } from './validation';
import './styles.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUserWithEmail({ formData: values, navigate }));
    },
  });

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Log In</h1>
          <p className="login-subtitle">Welcome back! Please log in to your account.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="social-login">
            <h3>Log in with social media</h3>
            <a className="btn btn-facebook" href={FACEBOOK_AUTH_LINK}>
              <i className="fa fa-facebook fa-fw" /> Login with Facebook
            </a>
            <a className="btn btn-google" href={GOOGLE_AUTH_LINK}>
              <i className="fa fa-google fa-fw" /> Login with Google
            </a>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <h3>Login with email address</h3>
          
          <div className="demo-credentials">
            <p><strong>Admin:</strong> email0@email.com / 123456789</p>
            <p><strong>User:</strong> email1@email.com / 123456789</p>
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              placeholder="Enter your email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="error">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              placeholder="Enter your password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : null}
          </div>

          {error && <p className="error">{error}</p>}

          <button
            className="btn btn-primary btn-block"
            disabled={isLoading || !formik.isValid}
            type="submit"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="register-link">
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </div>
        </form>

        <Link className="back-link" to="/">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Login;