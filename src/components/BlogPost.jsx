import { Link } from 'react-router-dom';

const BlogPost = ({ post }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Featured Image */}
      <div className="h-64 bg-gray-200">
        <img 
          src={post.image || 'https://via.placeholder.com/800x400'} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Post Content */}
      <div className="p-8">
        <div className="flex items-center mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            {post.category}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-500 text-sm">{post.date}</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        
        <div className="flex items-center mb-6">
          <img 
            src={post.author.avatar || 'https://via.placeholder.com/50'} 
            alt={post.author.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-medium text-gray-800">{post.author.name}</p>
            <p className="text-sm text-gray-500">{post.readTime} read</p>
          </div>
        </div>
        
        <div className="prose max-w-none text-gray-600 mb-8">
          {post.content}
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <Link
            to="/#blog"
            className="inline-flex items-center text-green-600 hover:text-green-800 transition"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;