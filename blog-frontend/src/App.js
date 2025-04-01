import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateBlog from './components/CreateBlog';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog';
import DeleteBlog from './components/DeleteBlog';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser(token);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUsername(decodedToken.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setUsername('');
  };

  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-3 rounded shadow">
          <a className="navbar-brand" href="/">Blog App</a>
          <div className="collapse navbar-collapse justify-content-end">
            {user ? (
              <>
                <span className="navbar-text text-white me-3">Welcome, {username}</span>
                <a className="btn btn-light me-2" href="/create">Create Blog</a>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <a className="btn btn-light me-2" href="/login">Login</a>
                <a className="btn btn-outline-light" href="/signup">Sign Up</a>
              </>
            )}
          </div>
        </nav>

        <div className="mt-4 p-4 bg-light rounded shadow-sm">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/blog/:id/edit" element={<EditBlog />} />
            <Route path="/blogs/:blogId/delete" element={<DeleteBlog />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;