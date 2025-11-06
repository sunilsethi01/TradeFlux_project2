import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from '../../config';

const Signup = ({ onSignupSuccess }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

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
        `${API_URL}/api/auth/signup`,
        {
          username,
          password,
          email
        }
      );
      
      // Check if token is returned (from updated backend)
      if (data.token) {
        // Save token
        localStorage.setItem('token', data.token);
        handleSuccess(data.msg || "Signup successful!");
        
        // Notify parent component
        if (onSignupSuccess) {
          onSignupSuccess();
        }
        
        setTimeout(() => {
          // Redirect to dashboard
          window.location.href = "/dashboard";
        }, 1000);
      } else if (data.message && !data.error) {
        handleSuccess(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(data.message || data.msg || "Signup failed");
      }
    } catch (error) {
      handleError(
        error?.response?.data?.message || 
        error?.response?.data?.msg || 
        "Network/server error."
      );
    }
    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
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
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;