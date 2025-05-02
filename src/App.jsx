import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogPostPage from './pages/BlogPostPage';
import AllBlogs from './components/AllBlogs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/all-blogs" element={<AllBlogs />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;