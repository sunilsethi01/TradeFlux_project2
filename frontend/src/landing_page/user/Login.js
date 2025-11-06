import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from '../../config';

const Login = ({ onLoginSuccess }) => {
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );
      
      if (data.token) {
        // Save token
        localStorage.setItem('token', data.token);
        handleSuccess(data.msg || "Login successful!");
        
        // Notify parent component
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        
        setTimeout(() => {
          // Redirect to dashboard
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        handleError(data.msg || data.message || "Login failed");
      }
    } catch (error) {
      handleError(
        error?.response?.data?.msg || 
        error?.response?.data?.message || 
        "Network/server error."
      );
    }
    setInputValue({
      username: "",
      password: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;