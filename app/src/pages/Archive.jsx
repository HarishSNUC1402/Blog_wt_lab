import { useState, useEffect } from "react";
import PostSummary from "../components/PostSummary";

export default function Archive() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`http://localhost:5050/posts`);
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      const posts = await response.json();
      setPosts(posts);
    }
    getPosts();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "2rem" }}>Archive</h2>
      <p style={{ marginBottom: "2rem", color: "#94a3b8" }}>All blog posts ever published are listed here.</p>
      <div className="posts-grid">
        {posts.map((post) => (
          <PostSummary post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
