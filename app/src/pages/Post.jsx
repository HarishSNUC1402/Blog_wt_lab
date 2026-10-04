import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5050/posts/${params.id}`);
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        navigate("/");
        return;
      }
      const data = await response.json();
      setPost(data);
    }
    fetchData();
  }, [params.id, navigate]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const date = new Date(post.date).toLocaleDateString();

  return (
    <div className="single-post glass">
      <h1>{post.title}</h1>
      <div className="meta">
        By {post.author} on {date}
      </div>
      <div className="content">
        {post.content}
      </div>
      <button onClick={() => navigate("/")} className="btn glass">Back to Home</button>
    </div>
  );
}
