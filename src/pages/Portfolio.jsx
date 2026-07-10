import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: "Drone Landing Gear",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop",
    desc: "Printed in PETG for high impact resistance."
  },
  {
    id: 2,
    title: "Custom Action Figure",
    category: "Miniatures",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=800&auto=format&fit=crop",
    desc: "High-detail resin-like print using PLA at 0.08mm."
  },
  {
    id: 3,
    title: "Gearbox Prototype",
    category: "Prototypes",
    image: "https://images.unsplash.com/photo-1631541909061-71e34edbcaf9?q=80&w=800&auto=format&fit=crop",
    desc: "Functional mechanical prototype printed in ABS."
  },
  {
    id: 4,
    title: "Architectural Model",
    category: "Prototypes",
    image: "https://images.unsplash.com/photo-1537884557178-342a575d7d16?q=80&w=800&auto=format&fit=crop",
    desc: "Scale model for a real estate project."
  },
  {
    id: 5,
    title: "Robot Arm Bracket",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1580983546522-f61b17b2f6b4?q=80&w=800&auto=format&fit=crop",
    desc: "Heavy-duty bracket with 100% infill."
  },
  {
    id: 6,
    title: "Tabletop RPG Characters",
    category: "Miniatures",
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=800&auto=format&fit=crop",
    desc: "Custom designed and printed D&D figurines."
  }
];

const categories = ["All", "Engineering", "Miniatures", "Prototypes"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-dark pt-10 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <motion.span className="inline-block py-1.5 px-4 rounded-full bg-navy/5 dark:bg-white/5 text-navy dark:text-bronze-light font-semibold text-sm mb-4">
            Our Work
          </motion.span>
          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-navy dark:text-white mb-4">
            Morvox <span className="text-bronze">Gallery</span>
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Discover some of our recent 3D printing projects. From functional engineering parts to highly detailed miniatures.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-navy dark:bg-bronze text-white dark:text-navy shadow-md"
                  : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* شبكة التصاور */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white dark:bg-navy/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-white/5 transition-all"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-bronze uppercase tracking-wider mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-navy dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {project.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default Portfolio;