import { motion } from 'framer-motion';
import { BookOpen, Video, ArrowRight, Clock, Sparkles } from 'lucide-react';

const Formation = () => {
  const isAvailable = false; 

  const articles = [
    { id: 1, title: "Mastering Onshape: From 2D Sketch to Complex 3D Assembly", type: "Article", readTime: "5 min read", date: "July 2026", desc: "Learn professional parametric modeling techniques optimized for 3D manufacturing tolerances." },
    { id: 2, title: "Choosing the Right Filament: PLA vs. PETG vs. ABS in Algerian Climate", type: "Guide", readTime: "8 min read", date: "June 2026", desc: "An in-depth analysis of material behaviors, humidity resistance, and structural strength." },
    { id: 3, title: "Calibrating Your 3D Printer First Layer Like a Pro", type: "Video", readTime: "12 min watch", date: "June 2026", desc: "A comprehensive video breakdown to eliminate bed adhesion issues permanently." },
  ];

  if (!isAvailable) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-navy-dark px-4 py-20">
        <div className="text-center max-w-xl mx-auto bg-white dark:bg-navy/40 p-10 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl">
          
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-bronze/10 text-bronze rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl"
          >
            <Clock className="w-10 h-10 animate-pulse" />
          </motion.div>

          <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-bronze/10 text-bronze font-semibold text-xs mb-4 uppercase tracking-wider">
            <Sparkles size={14} /> Bientôt Disponible
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white mb-4">
            Espace Formations en Cours de Préparation
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-base mb-8">
            نحن نعمل على تحضير أقوى الدروس والدورات التطبيقية في الـ 3D Printing و الهندسة. ترقبونا قريباً بمحتوى حصري!
          </p>

          <a 
            href="/" 
            className="inline-block bg-bronze hover:bg-bronze-light text-white px-8 py-3 rounded-xl font-bold shadow-md transition-colors"
          >
            Retour à l'accueil
          </a>

        </div>
      </div>
    );
  }

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

export default Formation;