import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    if (!username || !email || !password) {
      setErrorMessage('All fields are required!');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:8000/api/register/', { username, email, password });
      setSuccessMessage(response.data.message);  // Successful signup message
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || 'An error occurred');
      } else {
        setErrorMessage('Network error. Please try again later.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Signup</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSignup}>Signup</button>

      {/* Display error or success message */}
      {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      {successMessage && <p className="text-success mt-2">{successMessage}</p>}
    </div>
  );
};

export default Signup;
