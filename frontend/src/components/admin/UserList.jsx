import React from 'react';
import defaultImage from '../../assets/default_image.png'
import "./AdminHome.css";

const UserList = ({ users, currentUser, onEditUser, onDeleteUser }) => {
  return (
    <ul className="user-list">
      {users.map(user => (
        <li key={user.id} className="user-card">
          
          {/* LEFT SECTION */}
          <div className="user-info-block">
            <img 
              src={user.profile_image || defaultImage } 
              alt={user.username} 
            />

            <div className="user-details">
              <p className="user-name">
                {user.username}{" "}
                {user.email === currentUser.email && <span className="you-tag">(You)</span>}
              </p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>

          {/* RIGHT SECTION - ACTION BUTTONS */}
          <div className="action-buttons">
            <button className="edit-btn" onClick={() => onEditUser(user)}>
              Edit
            </button>

            {user.email !== currentUser.email && (
              <button 
                className="delete-btn" 
                onClick={() => onDeleteUser(user.id)}
              >
                Delete
              </button>
            )}
          </div>

        </li>
      ))}
    </ul>
  );
};

export default UserList;
