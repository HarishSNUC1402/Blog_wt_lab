import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Post from "./pages/Post";
import Archive from "./pages/Archive";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="glass">
          <h1>NexusBlog</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">New Post</Link></li>
            <li><Link to="/archive">Archive</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/edit/:id" element={<Create />} />
            <Route path="/archive" element={<Archive />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
