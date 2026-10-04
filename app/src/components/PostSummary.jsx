import { Link } from "react-router-dom";

export default function PostSummary({ post, onDelete }) {
  const date = new Date(post.date).toLocaleDateString();

  return (
    <div className="post-card glass">
      <h3>{post.title}</h3>
      <div className="meta">
        By {post.author} on {date}
      </div>
      <p>{post.content}</p>
      <div className="card-actions">
        <Link to={`/post/${post._id}`} className="btn btn-primary">Read More</Link>
        <Link to={`/edit/${post._id}`} className="btn glass">Edit</Link>
        {onDelete && (
          <button onClick={() => onDelete(post._id)} className="btn btn-danger">Delete</button>
        )}
      </div>
    </div>
  );
}
