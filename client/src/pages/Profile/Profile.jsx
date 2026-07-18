import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, editUser, deleteUser } from '../../store/userSlice.js';
import Loader from '../../components/Loader/Loader';
import { profileSchema } from './validation';
import './styles.css';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  
  const { profile, isLoading, error } = useSelector((state) => state.user);
  const { me } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile({ username, navigate }));
  }, [username, navigate, dispatch]);

  const onChange = (event) => {
    formik.setFieldValue('image', event.currentTarget.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    setAvatar(event.target.files[0]);
  };

  const handleClickEdit = () => {
    if (!profile) return;
    setIsEdit((oldIsEdit) => !oldIsEdit);
    setImage(null);
    setAvatar(null);
    formik.setFieldValue('id', profile.id);
    formik.setFieldValue('name', profile.name);
    formik.setFieldValue('username', profile.username);
    formik.setFieldValue('bio', profile.bio || '');
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser({ id, navigate }));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      name: '',
      username: '',
      password: '',
      bio: '',
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('name', values.name);
      formData.append('username', values.username);
      if (profile?.provider === 'email') {
        formData.append('password', values.password);
      }
      formData.append('bio', values.bio);
      dispatch(editUser({ id: values.id, formData, navigate }));
    },
  });

  return (
    <div className="profile-page">
      <h1 className="page-title">Profile</h1>
      <p className="page-description">
        View and manage your profile
      </p>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="empty-state">
          <div className="empty-icon">😕</div>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go Back Home
          </button>
        </div>
      ) : !profile ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>User not found</p>
          <p className="empty-hint">The user you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate('/users')}>
            Browse Users
          </button>
        </div>
      ) : (
        <div className="profile-content">
          <div className="profile-card">
            <img 
              src={image || profile.avatar || '/images/default-avatar.png'} 
              className="profile-avatar" 
              alt={profile.name} 
            />
            <div className="profile-header">
              <div className="profile-name">
                {profile.name}
                {profile.role === 'ADMIN' && <span className="badge badge-admin">ADMIN</span>}
              </div>
              <div className="profile-username">@{profile.username}</div>
              {me?.username === profile.username || me?.role === 'ADMIN' ? (
                <button className="btn btn-primary" type="button" onClick={handleClickEdit}>
                  {isEdit ? 'Cancel' : 'Edit Profile'}
                </button>
              ) : null}
            </div>

            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">Provider:</span>
                <span className="detail-value">{profile.provider}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{profile.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Bio:</span>
                <span className="detail-value">{profile.bio || 'No bio yet'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Joined:</span>
                <span className="detail-value">{moment(profile.createdAt).format('dddd, MMMM Do YYYY')}</span>
              </div>
            </div>
          </div>

          {isEdit && (
            <div className="card edit-form">
              <h3>Edit Profile</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>Avatar:</label>
                  <input name="image" type="file" onChange={onChange} />
                  {image && (
                    <button className="btn btn-secondary" onClick={() => {
                      setImage(null);
                      setAvatar(null);
                    }} type="button">
                      Remove Image
                    </button>
                  )}
                </div>
                <input name="id" type="hidden" value={formik.values.id} />
                
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    placeholder="Name"
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
                  <label>Username:</label>
                  <input
                    placeholder="Username"
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
                
                {profile.provider === 'email' && (
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      placeholder="Password"
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
                )}
                
                <div className="form-group">
                  <label>Bio:</label>
                  <textarea
                    placeholder="Tell us about yourself"
                    name="bio"
                    rows="4"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bio}
                  />
                  {formik.touched.bio && formik.errors.bio ? (
                    <p className="error">{formik.errors.bio}</p>
                  ) : null}
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button
                    onClick={() => handleDeleteUser(profile.id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Delete Profile
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;