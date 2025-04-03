import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';  

const DeleteBlog = () => {
  const { blogId } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [deleted, setDeleted] = useState(false); 
  const navigate = useNavigate(); 
  useEffect(() => {
    const token = localStorage.getItem('access_token');  

    
    axios.get(`http://localhost:8000/api/blogs/${blogId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      setBlog(response.data); 
    })
    .catch(error => {
      console.error('Error fetching blog:', error.response ? error.response.data : error.message);
    });
  }, [blogId]);

  const handleDeleteBlog = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this blog?'); 

    if (!isConfirmed) {
      return; 
    }

    const token = localStorage.getItem('access_token'); 

    
    axios.delete(`http://localhost:8000/api/blogs/${blogId}/delete/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log('Blog deleted successfully:', response.data);
      setDeleted(true); 
      setTimeout(() => {
        navigate('/'); 
      }, 2000);
    })
    .catch(error => {
      console.error('Error deleting blog:', error.response ? error.response.data : error.message);
    });
  };

  if (deleted) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-success">
          <h4>Blog deleted successfully.</h4>
          <p>Redirecting to the blog list...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container text-center mt-5">
        <h4>Unable to load , please logout and login again</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-center">Delete Blog</h2>
          <div className="text-center">
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
          </div>
          <div className="text-center">
            <button 
              onClick={handleDeleteBlog} 
              className="btn btn-danger btn-lg"
            >
              Delete Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlog;
