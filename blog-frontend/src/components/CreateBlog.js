import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateBlog = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!title || !content) {
      setErrorMessage("Title and Content are required!");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      setErrorMessage("You need to be logged in to create a blog!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/blogs/create/",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("Blog created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error creating blog:", error.response?.data);
      setErrorMessage(error.response?.data?.detail || "Error creating blog. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create Blog</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="form-group">
        <label htmlFor="blogTitle">Blog Title</label>
        <input
          type="text"
          className="form-control"
          id="blogTitle"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="blogContent">Blog Content</label>
        <textarea
          className="form-control"
          id="blogContent"
          rows="6"
          placeholder="Write your blog content here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="text-center mt-4">
        <button onClick={handleCreateBlog} className="btn btn-primary">
          Create Blog
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
