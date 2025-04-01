import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditBlog.css';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState({ title: '', content: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/blogs/${id}/`)
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => {
        setErrorMessage('Blog not found');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      setErrorMessage('You need to be logged in to edit a blog!');
      return;
    }

    axios
      .put(
        `http://localhost:8000/api/blogs/${id}/edit/`,
        { title: blog.title, content: blog.content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        setSuccessMessage('Blog updated successfully');
        setTimeout(() => {
          navigate(`/blog/${id}`);
        }, 1000);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            setErrorMessage('You are not authorized. Please log in again.');
          } else if (error.response.status === 404) {
            setErrorMessage('Blog not found');
          } else if (error.response.status === 403) {
            setErrorMessage('You are not authorized to edit this blog');
          } else {
            setErrorMessage('Error updating blog');
          }
        } else {
          setErrorMessage('Network error');
        }
        console.error(error);
      });
  };

  return (
    <div className="container edit-blog-container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-primary">Edit Blog</h2>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              id="content"
              className="form-control"
              rows="5"
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Update Blog</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;