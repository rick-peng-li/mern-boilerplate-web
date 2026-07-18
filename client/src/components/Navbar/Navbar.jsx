import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { logOutUser } from '../../store/authSlice.js';
import './styles.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onLogOut = (event) => {
    event.preventDefault();
    dispatch(logOutUser());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">MERN Boilerplate</Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {auth.isAuthenticated ? (
            <>
              <Link to="/users">Users</Link>
              <Link to="/posts">Posts</Link>
              <Link to="/notifications">Notifications</Link>
              <Link to="/settings">Settings</Link>
              <Link to={`/${auth.me?.username}`}>Profile</Link>
              {auth.me?.role === 'ADMIN' && (
                <Link to="/admin">Admin</Link>
              )}
              <img 
                className="avatar" 
                src={auth.me?.avatar || '/images/default-avatar.png'} 
                alt="Avatar" 
              />
              <button className="logout-btn" onClick={onLogOut}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;