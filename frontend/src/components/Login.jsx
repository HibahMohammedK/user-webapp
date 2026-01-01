import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // ✅ New state for showing password
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user?.access) {
      if (user?.is_staff) {
        navigate("/adminhome");
      } else {
        navigate("/home");
      }
    }
  }, [user, navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          {/* Password field with toggle */}
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <span className="toggle-password" onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">{loading ? "Loading..." : "Login"}</button>
          {error && <p>{JSON.stringify(error)}</p>}
          {user && <p className="success">sign up successful!</p>}
        </form>
        <Link to="/register">
          <span>Don’t have an account?</span> Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
