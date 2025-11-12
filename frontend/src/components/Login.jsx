import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };


  useEffect(() => {
    console.log("User:", user);
    console.log("Access token:", localStorage.getItem("access_token"));

    if (user?.access) {
      navigate("/home"); // navigate only when logged in
    }
  }, [user, navigate]);

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">{loading ? "Loading..." : "Login"}</button>
      {error && <p>{JSON.stringify(error)}</p>}
      {user && <p>Login successful!</p>}
    </form>
    <Link to='/register' ><button><span>Dont have an account  </span> signup </button></Link>
    </>
  );
};

export default Login;
