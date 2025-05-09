import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiCalendar, FiUser, FiArrowLeft } from 'react-icons/fi';
import { SiReact } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}blog/get/${slug}`
        );
        setPost(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Post not found</div>
      </div>
    );
  }


  
  // Format date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate full URL for sharing
  const fullPostUrl = `https://anisdev.vercel.app/blog/${post.slug}`;
  const imageUrl = post.imageUrl 
    ? `${import.meta.env.VITE_BASE_URL.replace('/api/v1/', '')}/public${post.imageUrl}`
    : 'https://anisdev.vercel.app/default-social-image.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Facebook Open Graph Meta Tags */}
      <Helmet>
        <title>{post.title} | Anisul Islam</title>
        <meta property="og:url" content={fullPostUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.subtitle || post.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Anisul Islam - Software Engineer" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.subtitle || post.excerpt} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      {/* Floating 3D elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Back button */}
        <motion.div
          whileHover={{ x: -5 }}
          className="mb-10"
        >
          <Link 
            to="/all-blogs" 
            className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Articles
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center mb-4 flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full">
              <SiReact className="mr-1" /> {post.category}
            </span>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="flex items-center text-gray-400 text-sm">
              <FiCalendar className="mr-1" /> {formattedDate}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl">
            {post.subtitle}
          </p>
        </motion.div>

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert max-w-4xl mx-auto text-amber-50"
        >
          {post.description && (
            <div dangerouslySetInnerHTML={{ __html: post.description }} />
          )}
          
          {post.imageUrl && (
            <img 
              src={imageUrl}
              alt={post.title}
              className="w-full rounded-xl my-8"
            />
          )}
        </motion.div>

        {/* Article footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-10 border-t border-gray-700"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Enjoyed this article?</h3>
          <div className="flex flex-wrap gap-4">
            {/* Facebook Share */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullPostUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#1877F2] text-white font-medium rounded-lg hover:bg-[#166FE5] transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              Share on Facebook
            </a>
            
            {/* Twitter (X) Share */}
            <a
              href={`https://x.com/intent/tweet?url=${encodeURIComponent(fullPostUrl)}&text=${encodeURIComponent(`Check out this article: ${post.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
              </svg>
              Share on X
            </a>

            {/* LinkedIn Share */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullPostUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#0A66C2] text-white font-medium rounded-lg hover:bg-[#0A5CAD] transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Share on LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPostPage;