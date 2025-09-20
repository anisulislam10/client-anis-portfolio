import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/cartSlice';

const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      ...product,
      quantity: 1  // Default quantity when first added
    }));
    navigate('/shop/cart');
  };

  const [products] = useState([
    {
      id: 1,
      name: 'React UI Templates',
      description: 'Beautifully designed React component templates',
      price: 1000,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      category: 'digital'
    },
    {
      id: 2,
      name: 'JavaScript E-book',
      description: 'Comprehensive guide to modern JavaScript',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      category: 'digital'
    },
    {
      id: 3,
      name: 'Developer Stickers',
      description: 'Set of 10 high-quality developer stickers',
      price: 500,
      image: 'https://devshopbd.com/wp-content/uploads/2024/02/sticker-dsb02st02-02.png',
      category: 'merchandise'
    },
    {
      id: 4,
      name: 'Hoodie- "IT WORKS ON MY MACHINE"',
      description: 'Everyone needs a cozy go-to hoodie to curl up in, so go for one thats soft, smooth, and stylish. Its the perfect choice for cooler evenings!',
      price: 700,
      image: 'https://developer-shop.com/cdn/shop/products/unisex-heavy-blend-hoodie-black-60094287c0f5c.jpg?v=1611219619&width=713',
      category: 'merchandise'
    },
    {
      id: 5,
      name: 'T-Shirt - "Developer"',
      description: '100% cotton t-shirt with a printed developer quote',
      price: 1300,
      image: 'https://thepixelfashion.com/cdn/shop/files/Angular_6.png?v=1720722219&width=533',
      category: 'merchandise'
    },
    {
      id: 6,
      name: 'Printed Mug - "Developer"',
      description: 'Funny mug for daily debugging warriors',
      price: 750,
      image: 'https://cdn.prod.website-files.com/621ce8c18852b857f473ad7b/62f9ca492008a347c7bf5470_black-glossy-mug-black-11oz-handle-on-left-62f9bb0f50500.jpg',
      category: 'merchandise'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'digital', name: 'Digital Products' },
    { id: 'merchandise', name: 'Merchandise' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);


    
  return (
    <section id="shop" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Developer Shop
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tools and merchandise for modern developers
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Filter by ${category.name}`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              aria-label={product.name}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {product.category === 'digital' && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Digital Download
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-500">
                    PKR: {product.price.toFixed(2)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 mb-4">No products found in this category</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="text-emerald-500 hover:text-emerald-600 font-medium"
              aria-label="View all products"
            >
              View all products
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Shop;