import { motion } from 'framer-motion';
import { BookOpen, Video, ArrowRight } from 'lucide-react';

const articles = [
  { id: 1, title: "Mastering Onshape: From 2D Sketch to Complex 3D Assembly", type: "Article", readTime: "5 min read", date: "July 2026", desc: "Learn professional parametric modeling techniques optimized for 3D manufacturing tolerances." },
  { id: 2, title: "Choosing the Right Filament: PLA vs. PETG vs. ABS in Algerian Climate", type: "Guide", readTime: "8 min read", date: "June 2026", desc: "An in-depth analysis of material behaviors, humidity resistance, and structural strength." },
  { id: 3, title: "Calibrating Your 3D Printer First Layer Like a Pro", type: "Video", readTime: "12 min watch", date: "June 2026", desc: "A comprehensive video breakdown to eliminate bed adhesion issues permanently." },
];

const Education = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-dark pt-10 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span className="inline-block py-1.5 px-4 rounded-full bg-bronze/10 text-bronze dark:text-bronze-light font-semibold text-sm mb-4">
            Knowledge Sharing Hub
          </motion.span>
          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-navy dark:text-white mb-4">
            Learn & <span className="text-bronze">Teach</span>
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            "The best of you are those who learn and teach." Explore our open-source guides, video tutorials, and engineering insights.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <div key={item.id} className="bg-white dark:bg-navy/40 p-8 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="flex items-center gap-2 bg-navy/5 dark:bg-white/5 px-3 py-1 rounded-full text-xs font-semibold text-navy dark:text-bronze-light">
                    {item.type === 'Video' ? <Video size={14} /> : <BookOpen size={14} />}
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-400">{item.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-navy dark:text-white mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  {item.desc}
                </p>
              </div>
              <button className="flex items-center gap-2 text-bronze dark:text-bronze-light font-semibold hover:gap-3 transition-all">
                <span>Read Full Guide</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Education;