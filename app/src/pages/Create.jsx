import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;

      const response = await fetch(`http://localhost:5050/posts/${params.id}`);
      if (!response.ok) {
        window.alert(`An error has occurred: ${response.statusText}`);
        return;
      }

      const post = await response.json();
      if (!post) {
        window.alert(`Post with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm({ title: post.title, content: post.content, author: post.author });
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newPost = { ...form };

    if (params.id) {
      // Update
      await fetch(`http://localhost:5050/posts/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      // Create
      await fetch("http://localhost:5050/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
    }

    setForm({ title: "", content: "", author: "" });
    navigate("/");
  }

  return (
    <div className="glass" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>{params.id ? "Edit Post" : "Create New Post"}</h2>
      <form onSubmit={onSubmit} style={{ padding: 0, margin: "2rem 0 0 0", maxWidth: "100%" }}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={form.author}
            onChange={(e) => updateForm({ author: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            {params.id ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
