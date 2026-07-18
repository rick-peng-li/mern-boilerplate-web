import { Link } from 'react-router-dom';
import './styles.css';

const Admin = () => {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>
        This is the Admin page. Only the Admin can access this page. Return back to{' '}
        <Link className="bold" to="/">
          Home
        </Link>
      </p>
      <div className="admin-panel">
        <h3>Admin Panel</h3>
        <ul>
          <li>Manage users</li>
          <li>Manage messages</li>
          <li>System settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;