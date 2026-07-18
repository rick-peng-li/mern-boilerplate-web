import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { editUser } from '../../store/userSlice.js';
import './styles.css';

const Settings = () => {
  const { me } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('account');
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    formik.setFieldValue('image', event.currentTarget.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    if (avatar) {
      formData.append('avatar', avatar);
    }
    formData.append('name', values.name);
    formData.append('username', values.username);
    formData.append('bio', values.bio);
    if (me?.provider === 'email' && values.password) {
      formData.append('password', values.password);
    }
    dispatch(editUser({ id: me.id, formData }));
  };

  const formik = useFormik({
    initialValues: {
      name: me?.name || '',
      username: me?.username || '',
      bio: me?.bio || '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Customize your account preferences</p>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <div className="user-profile-preview">
            <img src={image || me?.avatar || '/images/default-avatar.png'} className="avatar" />
            <h3>{me?.name}</h3>
            <p>@{me?.username}</p>
          </div>

          <div className="settings-nav">
            <button
              className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <span className="nav-icon">👤</span>
              <span className="nav-text">Account</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <span className="nav-icon">🔒</span>
              <span className="nav-text">Privacy</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <span className="nav-icon">🔔</span>
              <span className="nav-text">Notifications</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <span className="nav-icon">🛡️</span>
              <span className="nav-text">Security</span>
            </button>
          </div>
        </div>

        <div className="settings-content">
          {activeTab === 'account' && (
            <div className="settings-panel">
              <h2>Account Settings</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>Avatar:</label>
                  <img src={image || me?.avatar || '/images/default-avatar.png'} className="avatar-preview" />
                  <input type="file" onChange={handleAvatarChange} />
                  {image && (
                    <button type="button" className="btn btn-secondary" onClick={() => {
                      setImage(null);
                      setAvatar(null);
                    }}>
                      Remove Image
                    </button>
                  )}
                </div>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                </div>
                <div className="form-group">
                  <label>Bio:</label>
                  <textarea
                    name="bio"
                    rows="4"
                    placeholder="Tell us about yourself..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bio}
                  />
                </div>
                {me?.provider === 'email' && (
                  <div className="form-group">
                    <label>Password (leave empty to keep current):</label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Enter new password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                )}
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="settings-panel">
              <h2>Privacy Settings</h2>
              <div className="privacy-options">
                <div className="option-item">
                  <div className="option-info">
                    <h3>Show email to others</h3>
                    <p>Allow other users to see your email address on your profile</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h3>Allow followers</h3>
                    <p>Allow other users to follow you and see your activity</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h3>Receive messages</h3>
                    <p>Allow other users to send you private messages</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h3>Public profile</h3>
                    <p>Make your profile visible to everyone, including unauthenticated users</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-panel">
              <h2>Notification Settings</h2>
              <div className="notification-options">
                <div className="option-item">
                  <div className="option-info">
                    <h3>Email notifications</h3>
                    <p>Receive important updates via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h3>Push notifications</h3>
                    <p>Get browser notifications for new activity</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h3>Like notifications</h3>
                    <p>Notify me when someone likes my posts</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h3>Comment notifications</h3>
                    <p>Notify me when someone comments on my posts</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h3>Follow notifications</h3>
                    <p>Notify me when someone follows me</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-panel">
              <h2>Security Settings</h2>
              <div className="security-options">
                <div className="option-item">
                  <div className="option-info">
                    <h3>Two-factor authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="option-item">
                  <div className="option-info">
                    <h3>Session timeout</h3>
                    <p>Automatically log out after inactivity</p>
                  </div>
                  <select className="select-input">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>Never</option>
                  </select>
                </div>
                <div className="security-section">
                  <h3>Active Sessions</h3>
                  <div className="session-list">
                    <div className="session-item">
                      <div className="session-info">
                        <span className="session-device">Current Session</span>
                        <span className="session-location">Localhost</span>
                      </div>
                      <span className="session-time">Just now</span>
                    </div>
                  </div>
                </div>
                <div className="security-section">
                  <h3>Login History</h3>
                  <div className="login-history">
                    <div className="history-item">
                      <span className="history-time">Today, 3:30 PM</span>
                      <span className="history-location">Localhost</span>
                      <span className="history-status success">Success</span>
                    </div>
                    <div className="history-item">
                      <span className="history-time">Today, 2:15 PM</span>
                      <span className="history-location">Localhost</span>
                      <span className="history-status success">Success</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;