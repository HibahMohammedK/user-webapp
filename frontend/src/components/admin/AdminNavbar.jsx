import React from "react";
import defaultImage from '../../assets/default_image.png'

const AdminNavbar = ({ currentUser, onLogout }) => {
  return (
    <nav className="admin-navbar">
      <h1>Admin Dashboard</h1>

      <div className="user-info">
        <img
          src={currentUser?.profileImage || defaultImage }
          alt={currentUser?.name}
        />
        <span>{currentUser?.name}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
