import { motion } from 'framer-motion';
import { FiTool, FiClock, FiMail, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AllBlogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}blog/get`);
        setBlogData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-6 w-16 h-16 rounded-full border-4 border-t-emerald-400 border-r-emerald-400 border-b-transparent border-l-transparent"
          ></motion.div>
          <p className="text-gray-300 font-medium">Curating the best content for you...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto p-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-2xl"
        >
          <div className="text-red-400 mb-4 text-5xl">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Content Unavailable</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            Try Again
          </motion.button>
        </motion.div>
      </section>
    );
  }

  if (blogData.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="mb-10 inline-block"
            >
              <div className="w-28 h-28 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center mx-auto border border-emerald-400/20">
                <FiTool className="text-5xl text-emerald-400" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Coming Soon</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              We're crafting premium content to supercharge your development skills
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-emerald-400/30 transition-colors"
              >
                <div className="text-emerald-400 mb-4">
                  <FiClock className="text-3xl mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Launching Soon</h3>
                <p className="text-gray-400">Q1 2025</p>
              </motion.div>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-emerald-400/30 transition-colors"
              >
                <div className="relative w-14 h-14 mx-auto mb-4">
                  <div className="absolute inset-0 bg-emerald-400/10 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    75%
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Progress</h3>
                <p className="text-gray-400">Content in development</p>
              </motion.div>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-emerald-400/30 transition-colors"
              >
                <div className="text-emerald-400 mb-4">
                  <FiMail className="text-3xl mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Get Notified</h3>
                <p className="text-gray-400">Join our newsletter</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link 
                to="/"
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Return Home
              </Link>
              <button className="px-8 py-3.5 border border-emerald-400/30 text-emerald-400 font-medium rounded-lg hover:bg-emerald-400/10 transition-colors flex items-center justify-center gap-2">
                Notify Me
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-gray-900 to-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 text-sm font-medium tracking-wider text-emerald-400 bg-emerald-400/10 rounded-full mb-6">
            LATEST ARTICLES
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Blog</span> Collection
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore cutting-edge tutorials and industry insights from our experts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-emerald-400/30 shadow-xl hover:shadow-emerald-400/10 transition-all"
            >
              <div className="relative h-60 overflow-hidden">
               
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 bg-gray-900/80 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3 text-sm text-gray-400">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-5 line-clamp-2">{post.subtitle}</p>
                
                <Link
                  to={`/blog/${post._id}`}
                  className="inline-flex items-center text-emerald-400 font-medium hover:text-emerald-300 transition-colors group/readmore"
                >
                  Read More
                  <FiArrowRight className="ml-2 transition-transform group-hover/readmore:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBlogs;