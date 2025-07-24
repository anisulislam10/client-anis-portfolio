import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllBlogs from './components/AllBlogs';
import AllProject from './components/AllProjects';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';  
import BlogPostPage from './components/BlogPostPage';
import Shop_homepage from './components/shop/Shop_homepage';
import Shop_page from './pages/Shop/Shop_page';
import AddToCart from './components/shop/AddToCart';

// import CheckOut from './components/shop/CheckOut';

// import ProtectedRoute from './components/Admin/ProtectedRoute';

function App() {
 
  return (
    
    <Router>

      <div className="min-h-screen bg-gray-50">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/all-projects" element={<AllProject />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/super-admin/dashboard" element={<Dashboard />} />

          {/* shop routes */}
          <Route path="/shop" element={<Shop_page />} />
          <Route path="/shop/cart" element={<AddToCart />} />
          {/* <Route path="/shop/cart/checout" element={<CheckOut />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
