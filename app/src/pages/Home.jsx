import { useState, useEffect } from "react";
import PostSummary from "../components/PostSummary";

export default function Home() {
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

  async function deletePost(id) {
    await fetch(`http://localhost:5050/posts/${id}`, {
      method: "DELETE"
    });
    setPosts(posts.filter((post) => post._id !== id));
  }

  return (
    <div>
      <h2 style={{ marginBottom: "2rem" }}>Latest Posts</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <PostSummary post={post} key={post._id} onDelete={deletePost} />
        ))}
      </div>
    </div>
  );
}
