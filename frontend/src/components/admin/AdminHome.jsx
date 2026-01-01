import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserThunk } from "../../store/userSlice";
import { logout } from "../../store/authSlice";
import AdminNavbar from "./AdminNavbar";
import UserList from "./UserList";
import UserModal from "./UserModal";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isLoading } = useSelector((state) => state.users);
  const { user: currentUser } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("users"); // users / admins
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!users) return;

    let result = users;

    if (viewMode === "users") result = result.filter((u) => !u.is_staff);
    if (viewMode === "admins") result = result.filter((u) => u.is_staff);

    if (searchQuery) {
      result = result.filter(
        (u) =>
          u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(result);
  }, [users, searchQuery, viewMode]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <div className="admin-home">
      <AdminNavbar currentUser={currentUser} onLogout={handleLogout} />

      {/* MAIN CONTENT */}
      <div className="admin-content">
        {/* Top Controls */}
        <div className="controls">
          <input
            type="text"
            placeholder={`Search ${viewMode}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            className="create-btn"
            onClick={() => setShowCreateForm(true)}
          >
            + Create {viewMode === "admins" ? "Admin" : "User"}
          </button>
        </div>

        {/* Toggle Button */}
        <div className="view-mode-toggle">
          <button
            className={viewMode === "users" ? "active" : ""}
            onClick={() => setViewMode("users")}
          >
            Users
          </button>

          <button
            className={viewMode === "admins" ? "active" : ""}
            onClick={() => setViewMode("admins")}
          >
            Admins
          </button>
        </div>

        {/* User List */}
        <div className="user-list-container">
          {isLoading ? (
            <p className="loading">Loading users...</p>
          ) : (
            <UserList
              users={filteredUsers}
              currentUser={currentUser}
              onEditUser={setEditingUser}
              onDeleteUser={(id) => {
              if (window.confirm("Are you sure you want to delete this user?")) {
                dispatch(deleteUserThunk(id));
              }
            }}
            />
          )}
        </div>

        {/* Modals */}
        {showCreateForm && (
          <UserModal mode="create" onClose={() => setShowCreateForm(false)} />
        )}

        {editingUser && (
          <UserModal
            mode="edit"
            user={editingUser}
            onClose={() => setEditingUser(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminHome;
