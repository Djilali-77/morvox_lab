import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logoImg from '../../assets/Navbar.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'Store', href: '/store' },
    { name: 'Sur-mesure', href: '/custom' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Education', href: '/education' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-navy-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-row items-center gap-3 text-2xl font-bold text-navy dark:text-white tracking-tight"
              >
                <img src={logoImg} alt="Morvox Lab Logo" className="h-10 w-auto object-contain shrink-0" />
                <span className="hidden sm:block whitespace-nowrap">MORVOX <span className="text-bronze">LAB</span></span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link key={link.name} to={link.href}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-navy dark:text-gray-300 hover:text-bronze dark:hover:text-bronze font-medium transition-colors duration-300"
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full text-navy dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/custom">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-navy dark:bg-bronze hover:bg-navy-light dark:hover:bg-bronze-light text-white dark:text-navy px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md text-center inline-block"
              >
                Get Started
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="text-navy dark:text-white"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy dark:text-white transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white dark:bg-navy-dark border-t border-gray-100 dark:border-white/10"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)} // <--- هادي هي العفسة لي زدناها!
                className="block px-3 py-3 text-base font-medium text-navy dark:text-gray-300 hover:text-bronze dark:hover:text-bronze hover:bg-gray-50 dark:hover:bg-white/5 rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;