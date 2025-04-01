import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBlog, updateBlog, getBlog } from "../api";

function BlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (id) {
      getBlog(id).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = { title, content };

    if (id) {
      await updateBlog(id, blogData, token);
    } else {
      await createBlog(blogData, token);
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Blog" : "Create Blog"}</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default BlogForm;
