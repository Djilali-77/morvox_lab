import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-navy-dark overflow-hidden pt-20 transition-colors duration-300">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-bronze/20 dark:bg-bronze/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-navy/20 dark:bg-navy-light/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block py-1.5 px-4 rounded-full bg-navy/5 dark:bg-white/5 text-navy dark:text-bronze-light border border-navy/10 dark:border-white/10 font-semibold text-sm tracking-wide"
          >
            Algeria's Premier 3D Hub
          </motion.span>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-navy dark:text-white tracking-tight leading-tight">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze to-bronze-dark dark:from-bronze-light dark:to-bronze">Excellence</span> <br/>
            One Layer at a Time
          </h1>

          {/* Slogan / Subheadline */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
            "The best of you are those who learn and teach." <br className="hidden md:block" />
            Discover custom CAD designs, premium 3D printed parts, and master the art of manufacturing.
          </p>

          {/* Call To Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link 
              to="/store"
              className="w-full sm:w-auto px-8 py-4 bg-navy dark:bg-bronze hover:bg-navy-light dark:hover:bg-bronze-light text-white dark:text-navy rounded-lg font-bold text-lg text-center transition-all duration-300 shadow-lg hover:shadow-navy/30 dark:hover:shadow-bronze/30 transform hover:-translate-y-1"
            >
              Explore Store
            </Link>
            
            <Link 
              to="/custom"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-navy-dark border-2 border-gray-200 dark:border-gray-700 text-navy dark:text-white hover:border-bronze dark:hover:border-bronze hover:text-bronze dark:hover:text-bronze rounded-lg font-bold text-lg text-center transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
            >
              Request Custom Part
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;