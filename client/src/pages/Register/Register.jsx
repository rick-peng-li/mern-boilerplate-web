import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { registerUserWithEmail } from '../../store/authSlice.js';
import { registerSchema } from './validation';
import './styles.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUserWithEmail({ formData: values, navigate }));
    },
  });

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join us today and start exploring</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="register-form" noValidate>
          <div className="form-group">
            <label>Name</label>
            <input
              placeholder="Enter your name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="error">{formik.errors.name}</p>
            ) : null}
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              placeholder="Choose a username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="error">{formik.errors.username}</p>
            ) : null}
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
            type="submit"
            disabled={isLoading || !formik.isValid}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className="login-link">
            Already have an account?{' '}
            <Link to="/login">Log In</Link>
          </div>
        </form>

        <Link className="back-link" to="/">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Register;