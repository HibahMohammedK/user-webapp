import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileThunk, updateProfileThunk } from "../../../store/userSlice";
import { logout, updateAuthUser } from '../../../store/authSlice';
import defaultImage from '../../../assets/default_image.png'
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchProfileThunk());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username,
        email: profile.email,
      });
      setProfileImage(profile.profile_image);
    }
  }, [profile]);

   const handleLogout = () => {
     dispatch(logout());
     navigate('/');
   };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
      setProfileImage(e.target.files[0]);
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage(""); // reset previous message

      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);

      if (profileImage instanceof File) {
        data.append("profile_image", profileImage);
      }

      try {
        const updatedProfile = await dispatch(updateProfileThunk(data)).unwrap();

         dispatch(updateAuthUser({
          username: updatedProfile.username,
          profile_image: updatedProfile.profile_image,
        }));

        // update local state for UI
        setProfileImage(updatedProfile.profile_image);

        setMessage("Profile updated successfully!");
      } catch (err) {
         if (err?.username) {
            setMessage(err.username[0]);
          } else if (err?.email) {
            setMessage(err.email[0]);
          } else {
            setMessage("Profile update failed.");
          }
      } finally {
        setLoading(false);
      }
    };


  if (isLoading || !profile) return <p>Loading...</p>;


  return (
 <div className="profile-page">
  <div className="profile-topbar">
    <div className="nav-left">
      <h2>Profile page</h2>
    </div>
    <button className="topbar-btn" onClick={() => navigate(-1)}>Back</button>
    <button className="topbar-btn" onClick={handleLogout}>Logout</button>
  </div>

      <div className="profile-card">
        <h2 className="title">My Profile</h2>

        {/* Profile Photo */}
        <div className="profile-photo-section">
        <img
          src={
            profileImage instanceof File
              ? URL.createObjectURL(profileImage)
              : profile?.profile_image
                ? profile.profile_image
                : defaultImage
          }
          alt="Profile"
          className="profile-photo"
        />


          <div>
            <label htmlFor="profileImage" className="upload-btn">
              Change Photo
            </label>

            <input
              type="file"
              accept="image/*"
              id="profileImage"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            <p className="upload-limit">Max size 3 MB</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <h3 className="section-title">Basic Details</h3>

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="save-btn-wrapper">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
</div>
  );
};

export default Profile;
