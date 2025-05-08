import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';



const Blog = () => {
  const [blogData, setblogData] = useState()
  useEffect(() => {
    const fetchData= async()=>{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}blog/get`)
      setblogData(response.data)


    }
    fetchData()
  }, [])

  const displayedBlogs= blogData?.slice(0,6)
  

  return (
    <section id="blog" className="relative py-28 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Floating 3D elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
        <div className="absolute inset-0 bg-[size:20px_20px] [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 text-sm font-medium tracking-wider text-emerald-400 bg-emerald-400/10 rounded-full mb-6"
          >
            LATEST INSIGHTS
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Blog</span> Posts
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Discover cutting-edge tutorials, industry insights, and development best practices from our experts.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto mt-8"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {displayedBlogs?.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-emerald-400/30 shadow-2xl shadow-black/50 hover:shadow-emerald-400/10 transition-all"
            >
            
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3 text-sm text-gray-400">
                <span>
  {new Date(post.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}
</span>                  {/* <span>{post.readTime}</span> */}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {post.title}
                
                </h3>
                <div className='text-amber-50'>
                {post?.subtitle}
                </div>
                <p className="text-gray-300 mb-5 line-clamp-2">{post.excerpt}</p>
                
                <Link
                  to={`/blog/${post._id}`}
                  className="inline-flex items-center text-emerald-400 font-medium hover:text-emerald-300 transition-colors group/readmore"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover/readmore:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/all-blogs"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-gray-900 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] group"
          >
            Explore All Articles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;