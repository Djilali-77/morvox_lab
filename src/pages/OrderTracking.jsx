import { useState } from 'react';
import { motion } from 'framer-motion';

const OrderTracking = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState('');

  // هادو هما المراحل نتاع الطباعة
  const steps = [
    { id: 1, name: 'Commande Reçue', icon: '📝' },
    { id: 2, name: 'En cours d\'impression 3D', icon: '🖨️' },
    { id: 3, name: 'Finition & Emballage', icon: '📦' },
    { id: 4, name: 'En route pour la livraison', icon: '🚚' },
  ];

  // هادي فنكشن وهمية دركا باش نتيستيو (من بعد نربطوها بالداتابيز)
  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingCode.trim()) {
      setError('Veuillez entrer un code valide.');
      return;
    }
    
    // إذا الكود يبدا بـ MRV، نعطولو مرحلة عشوائية باش يتيستي
    if (trackingCode.toUpperCase().startsWith('MRV-')) {
      setError('');
      // هنا نورمالمون نجيبو الحالة من الداتابيز، دركا درناها مرحلة 2 (Impression) كمثال
      setOrderStatus(2); 
    } else {
      setOrderStatus(null);
      setError('Code introuvable. Vérifiez votre code (ex: MRV-1234).');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-navy dark:text-white mb-4">
            Suivez votre Commande
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Entrez votre code de suivi (ex: MRV-XXXX) pour voir l'état de votre impression 3D.
          </p>
        </div>

        <div className="bg-white dark:bg-navy-dark rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 dark:border-white/10">
          {/* فورم البحث */}
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-10">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              placeholder="Code de suivi (MRV-...)"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-navy text-navy dark:text-white focus:ring-2 focus:ring-bronze outline-none uppercase"
            />
            <button
              type="submit"
              className="bg-bronze hover:bg-bronze-light text-white px-8 py-3 rounded-xl font-bold shadow-md transition-colors"
            >
              Suivre
            </button>
          </form>

          {error && <p className="text-red-500 text-center mb-6">{error}</p>}

          {/* خط التتبع (Timeline) يبان غير كي يكون كاين orderStatus */}
          {orderStatus && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <h3 className="text-xl font-bold text-navy dark:text-white mb-8 text-center border-b border-gray-200 dark:border-gray-700 pb-4">
                État de la commande : <span className="text-bronze">{trackingCode}</span>
              </h3>
              
              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
                {/* الخط لي يربط الدوائر (في الميكرو) */}
                <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10">
                  <div 
                    className="h-full bg-bronze transition-all duration-500"
                    style={{ width: `${((orderStatus - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {steps.map((step, index) => {
                  const isCompleted = step.id <= orderStatus;
                  const isCurrent = step.id === orderStatus;

                  return (
                    <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-2 relative z-10 w-full md:w-1/4 text-left md:text-center">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md transition-colors duration-300 ${
                          isCompleted ? 'bg-bronze text-white ring-4 ring-bronze/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <p className={`font-bold ${isCurrent ? 'text-bronze' : isCompleted ? 'text-navy dark:text-white' : 'text-gray-400'}`}>
                          {step.name}
                        </p>
                        {isCurrent && (
                          <span className="text-xs bg-bronze/10 text-bronze px-2 py-1 rounded-full mt-1 inline-block">
                            Étape actuelle
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;