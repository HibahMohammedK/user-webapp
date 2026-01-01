import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useNavigate,Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./Register.css"

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    navigate('/')
  };



  return (
    <div className="register-page">
    
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <h2>Create your account</h2>

      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
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

      <div className="password-field">
        <input
          type={showPassword2 ? "text" : "password"}
          name="password2"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <span className="toggle-password" onClick={() => setShowPassword2(prev => !prev)}>
          {showPassword2 ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <button type="submit">{loading ? "Loading..." : "Register"}</button>
      {error && <p>{JSON.stringify(error)}</p>}
    </form>
    <Link to="/"><span>Already have an account? </span>Login</Link>
  </div>
  );
};

export default Register;
