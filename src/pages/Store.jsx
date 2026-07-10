import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const products = [
  { id: 1, name: "Custom Drone Frame", price: "4,500 DZD", category: "Parts", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Ergonomic Laptop Stand", price: "2,200 DZD", category: "Accessories", image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Raspberry Pi Case", price: "1,500 DZD", category: "Tech", image: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Articulated Robot Action Figure", price: "3,000 DZD", category: "Toys", image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Mechanical Keyboard Keycaps", price: "1,800 DZD", category: "Accessories", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Gear Assembly Kit", price: "5,500 DZD", category: "Education", image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Store = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-dark pt-10 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-navy dark:text-white mb-4"
          >
            Premium 3D <span className="text-bronze">Store</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            Explore our collection of high-quality, ready-to-ship 3D printed parts and accessories. Designed with precision, printed with passion.
          </motion.p>
        </div>

        {/* Products Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              variants={itemVariants}
              className="bg-white dark:bg-navy/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-bronze/10 border border-gray-100 dark:border-white/5 transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-navy-dark/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-navy dark:text-bronze-light">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy dark:text-white mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-extrabold text-bronze dark:text-bronze-light">
                    {product.price}
                  </span>
                  <button className="flex items-center gap-2 bg-gray-100 dark:bg-white/10 hover:bg-navy hover:text-white dark:hover:bg-bronze dark:hover:text-navy text-navy dark:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300">
                    <ShoppingCart size={18} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Store;