import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createUserThunk, updateUserThunk } from '../../store/userSlice';

const UserModal = ({ mode, user = {}, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'user',
    password: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit') {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        role: user.is_staff ? 'admin' : 'user',
        password: '',
      });
    }
  }, [mode, user]);

  const validate = () => {
    const errs = {};
    if (!formData.username) errs.username = 'Username required';
    if (!formData.email) errs.email = 'Email required';
    return errs;
  };

  const handleSubmit = async () => {
  const errs = validate();
  setErrors(errs);
  if (Object.keys(errs).length > 0) return;

  // convert role → is_staff
  const payload = {
    username: formData.username,
    email: formData.email,
    is_staff: formData.role === "admin",
  };

  // add password only when creating
  if (mode === "create") {
    payload.password = formData.password;
  }

  if (mode === "edit") {
      await dispatch(updateUserThunk({ 
        id: user.id, 
        userData: payload    
      }));
    } else {
      await dispatch(createUserThunk(payload));
    }

  onClose();
};


  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{mode === 'edit' ? 'Edit User' : 'Create User'}</h2>

        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        {errors.username && <p className="error-text">{errors.username}</p>}

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {mode === 'create' && (
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        )}

        <div className="modal-actions">
          <button className="save-btn" onClick={handleSubmit}>
            {mode === 'edit' ? 'Save' : 'Create'}
          </button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
