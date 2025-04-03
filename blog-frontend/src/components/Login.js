import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Make sure to import Bootstrap CSS

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {

    setErrorMessage('');
    setSuccessMessage('');

  
    if (!validateForm()) return;

    try {
     
      const response = await axios.post('http://localhost:8000/api/login/', {
        username: username,
        password: password,
      });

  
      if (response.data.token) {
        localStorage.setItem('access_token', response.data.token);  
        setUser(response.data.token);  
        setSuccessMessage('Login successful! Redirecting to Home...');
        setTimeout(() => {
          navigate('/');  
        }, 1500);
      } else {
        setErrorMessage('Unexpected error: No token returned');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || 'Invalid login credentials');
      } else {
        setErrorMessage('Network error. Please try again later.');
      }
    }
  };

 
  const validateForm = () => {
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return false;
    }
    return true;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <div className="col-md-6 offset-md-3">
       
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button onClick={handleLogin} className="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
