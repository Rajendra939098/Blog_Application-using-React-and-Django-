import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/blogs/${id}/`)
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => {
        setErrorMessage('Error fetching blog details');
      });
  }, [id]);

  if (!blog) {
    return <div className="loading">Loading...</div>;
  }

  const handleEdit = () => {
    navigate(`/blog/${id}/edit`);
  };

  

  return (
    <div className="container blog-detail-container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-primary">Blog Detail</h2>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <div className="blog-content">
          <h3 className="blog-title text-dark">{blog.title}</h3>
          <p className="blog-text text-muted">{blog.content}</p>
          <p className="author"><strong>Author:</strong> {blog.author.username}</p>
          <p className="text-danger">Only this user <strong>{blog.author.username} </strong>can Update / Delete this Blog</p>
        </div>

        <div className="mt-4 d-flex justify-content-between">
          <button onClick={() => navigate('/')} className="btn btn-secondary">Back to Blog List</button>
          <button onClick={handleEdit} className="btn btn-warning">Edit Blog</button>
          <Link to={`/blogs/${blog.id}/delete`}>
            <button className="btn btn-danger">Delete</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;