import { motion } from 'framer-motion';
import { FiTool, FiClock, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AllBlogs = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated construction icon */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              y: [0, -15, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="mb-8 inline-block"
          >
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto">
              <FiTool className="text-4xl text-emerald-500" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Blog is <span className="text-emerald-500">Coming Soon</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're working hard to bring you insightful articles and tutorials. 
            Stay tuned for valuable content about modern web development!
          </p>

          {/* Countdown/status cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-emerald-500 mb-4">
                <FiClock className="text-3xl mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Estimated Launch</h3>
              <p className="text-gray-600">May 15, 2025</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-emerald-500 mb-4">
                <div className="relative w-12 h-12 mx-auto">
                  <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping"></div>
                  <div className="absolute inset-1 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">75%</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Progress</h3>
              <p className="text-gray-600">Content in development</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-emerald-500 mb-4">
                <FiMail className="text-3xl mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Notified</h3>
              <p className="text-gray-600">Subscribe for updates</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/"
              className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Return Home
            </Link>
            <button className="px-6 py-3 border border-emerald-500 text-emerald-500 font-medium rounded-lg hover:bg-emerald-50 transition-colors">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllBlogs;