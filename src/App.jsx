import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllBlogs from './components/AllBlogs';
import AllProject from './components/AllProjects';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';  
import BlogPostPage from './components/BlogPostPage';
// import ProtectedRoute from './components/Admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/all-projects" element={<AllProject />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/super-admin/dashboard" element={<Dashboard />} />





        </Routes>
      </div>
    </Router>
  );
}

export default App;