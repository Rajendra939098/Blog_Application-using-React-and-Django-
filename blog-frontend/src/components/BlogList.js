import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = (page) => {
    axios.get(`http://localhost:8000/api/blogs/?page=${page}`)
      .then(response => {
        setBlogs(response.data.results);  
        setTotalPages(Math.ceil(response.data.count / 5)); 
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  };

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`);
  };

  const getFirstTwentyWords = (content) => {
    const words = content.split(' ');
    return words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Blog List</h1>

      <div className="row">
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <div className="col-md-4 mb-4" key={blog.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{getFirstTwentyWords(blog.content) || 'No description available.'}</p>
                  <button onClick={() => handleReadMore(blog.id)} className="btn btn-primary">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No blogs available.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <button 
          className="btn btn-secondary mx-2"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          className="btn btn-secondary mx-2"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
