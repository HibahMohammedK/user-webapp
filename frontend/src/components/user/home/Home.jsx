import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/authSlice';
import { fetchProfileThunk } from '../../../store/userSlice';
import defaultImage from '../../../assets/default_image.png'
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);
  const { profile, isLoading } = useSelector(state => state.users);

  // Fetch profile on mount
  useEffect(() => {
    dispatch(fetchProfileThunk());
  }, [dispatch]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
       dispatch(logout());
        navigate("/");
      }
  };

  const goToProfile = () => {
    navigate('/profile'); // Navigate to your profile route
  };

  if (isLoading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="home-page">
      <nav className="navbar">

        <div className="navbar-left">
          <h2>User Home</h2>
        </div>

        <div className="navbar-right">
          <div className="user-info">
            <img
              src={profile?.profile_image || defaultImage}
              alt="Profile"
              className="navbar-profile-img"
            />
            <span className="username">{user?.username || "Guest"}</span>
          </div>

          <button onClick={goToProfile}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="home-content">
        <div className="welcome-section">
          <h1>Welcome, {user?.username || 'Guest'}</h1>
          <h5>User Home Page</h5>
        </div>
      </main>
    </div>
  );
};

export default Home;
