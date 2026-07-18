import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications, markAllRead, deleteNotification } from '../../store/notificationsSlice.js';
import Loader from '../../components/Loader/Loader.jsx';
import './styles.css';

const NotificationItem = ({ notification, onDelete }) => {
  const getNotificationText = () => {
    switch (notification.type) {
      case 'like':
        return `${notification.fromUser?.name} liked your post`;
      case 'comment':
        return `${notification.fromUser?.name} commented on your post`;
      case 'follow':
        return `${notification.fromUser?.name} followed you`;
      case 'message':
        return `${notification.fromUser?.name} sent you a message`;
      default:
        return 'New notification';
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'follow': return '👥';
      case 'message': return '📩';
      default: return '🔔';
    }
  };

  return (
    <div className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
      <div className="notification-icon">{getNotificationIcon()}</div>
      <Link to={`/${notification.fromUser?.username}`}>
        <img src={notification.fromUser?.avatar || '/images/default-avatar.png'} className="avatar" />
      </Link>
      <div className="notification-content">
        <p>{getNotificationText()}</p>
        <span className="time">{moment(notification.createdAt).fromNow()}</span>
      </div>
      <button onClick={() => onDelete(notification._id)} className="btn btn-danger btn-sm">
        Delete
      </button>
    </div>
  );
};

const Notifications = () => {
  const { notifications, isLoading } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleMarkAllRead = () => {
    dispatch(markAllRead());
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  const stats = {
    total: notifications?.length || 0,
    unread: notifications?.filter(n => !n.read).length || 0,
    read: notifications?.filter(n => n.read).length || 0,
  };

  const groupedNotifications = {
    likes: notifications?.filter(n => n.type === 'like') || [],
    comments: notifications?.filter(n => n.type === 'comment') || [],
    follows: notifications?.filter(n => n.type === 'follow') || [],
    messages: notifications?.filter(n => n.type === 'message') || [],
  };

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
        <p className="page-description">Stay updated with your activity</p>
      </div>

      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Notifications</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: '#1890ff' }}>{stats.unread}</div>
          <div className="stat-label">Unread</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.read}</div>
          <div className="stat-label">Read</div>
        </div>
      </div>

      <div className="notifications-header">
        {notifications.length > 0 && (
          <button onClick={handleMarkAllRead} className="btn btn-primary">
            Mark All Read
          </button>
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="notifications-container">
          {stats.unread > 0 && (
            <div className="notification-group">
              <h3>Unread ({stats.unread})</h3>
              {notifications.filter(n => !n.read).map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {stats.read > 0 && (
            <div className="notification-group">
              <h3>Read ({stats.read})</h3>
              {notifications.filter(n => n.read).map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {notifications.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔔</div>
              <p>No notifications yet.</p>
              <p className="empty-hint">You'll see updates here when someone likes, comments, or follows you.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;