import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getUsers } from '../../store/usersSlice.js';
import Loader from '../../components/Loader/Loader';
import './styles.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <Link to={`/${user.username}`} className="user-avatar">
        <img src={user.avatar || '/images/default-avatar.png'} alt={user.name} />
      </Link>
      <div className="user-info">
        <div className="user-name">
          <span>{user.name}</span>
          {user.role === 'ADMIN' && <span className="badge badge-admin">ADMIN</span>}
        </div>
        <div className="user-meta">
          <Link to={`/${user.username}`} className="user-username">@{user.username}</Link>
          <span className="user-provider">{user.provider}</span>
        </div>
        <div className="user-email">{user.email}</div>
        <div className="user-joined">Joined {moment(user.createdAt).format('MMM Do, YYYY')}</div>
      </div>
    </div>
  );
};

const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  }) || [];

  const stats = {
    total: users?.length || 0,
    admins: users?.filter(u => u.role === 'ADMIN').length || 0,
    regular: users?.filter(u => u.role !== 'ADMIN').length || 0,
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <h1 className="page-title">Users</h1>
        <p className="page-description">Explore all users in the community</p>
      </div>

      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.admins}</div>
          <div className="stat-label">Admins</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.regular}</div>
          <div className="stat-label">Regular Users</div>
        </div>
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search users by name, username, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="filter-select">
          <option value="all">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div>

      <div className="users-list">
        {isLoading ? (
          <Loader />
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="empty-state">
            <p>No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;