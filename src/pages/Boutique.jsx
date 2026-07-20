import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react';

const products = [
  { id: 1, name: "Key Plate Holder", price: 1490, category: "Accessories", image: "/key.png" },
  { id: 2, name: "Desk Organizer", price: 3490, category: "Accessories", image: "/Desk Organizer.png" },
  { id: 3, name: "Handle Carrier", price: 1190, category: "Parts", image: "/Handle Carrier.step.png" },
  { id: 4, name: "Headphone Stand", price: 2790, category: "Accessories", image: "/Headphone stand.png" },
  { id: 5, name: "Card Organizer", price: 1390, category: "Accessories", image: "/Crad organizer.png" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Boutique = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    wilaya: ''
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    const code = 'MRV-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setTrackingCode(code);
    
    const orderDetails = cart.map(item => `▪️ [ ${item.qty} x ] ${item.name} (${item.price} DA)`).join('\n');
    
    // Ajout du calcul de la quantité totale si tu souhaites l'afficher
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    
    const message = `*🛒 NOUVELLE COMMANDE (Boutique)*\n
      *Réf Commande :* ${code}

      *👤 Informations Client :*
      - Nom : ${customerInfo.name}
      - Tél : ${customerInfo.phone}
      - Wilaya : ${customerInfo.wilaya}\n
      *🛍️ Détails du Panier :*
      ${orderDetails}\n
      *📦 Nombre d'articles : ${totalItems}*
      *💰 TOTAL À PAYER : ${totalPrice} DA*`;

          const phoneNumber = "213561119298";
          const encodedMessage = encodeURIComponent(message);
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
          
          window.open(whatsappUrl, '_blank');
          
          setOrderComplete(true);
    };

  const closeAndResetCart = () => {
    setCart([]);
    setCustomerInfo({ name: '', phone: '', wilaya: '' });
    setOrderComplete(false);
    setIsCheckout(false);
    setIsCartOpen(false);
    setTrackingCode('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-dark pt-10 pb-20 transition-colors duration-300 relative overflow-hidden">
      
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 left-8 z-40 bg-bronze hover:bg-bronze-light text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-colors"
          >
            <ShoppingBag size={24} />
            <span className="absolute -top-2 -right-2 bg-navy text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-navy-dark">
              {cart.reduce((acc, item) => acc + item.qty, 0)}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
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
            Explore our collection of high-quality, ready-to-ship 3D printed parts and accessories.
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
              <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-navy-dark/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-navy dark:text-bronze-light shadow-sm">
                  {product.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-navy dark:text-white mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-extrabold text-bronze dark:text-bronze-light">
                    {product.price} DA
                  </span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-2 bg-navy hover:bg-navy-light dark:bg-bronze dark:hover:bg-bronze-light text-white dark:text-navy px-4 py-2 rounded-lg font-medium transition-colors duration-300 active:scale-95"
                  >
                    <ShoppingCart size={18} />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 🛍️ Sidebar Panier */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-navy/60 dark:bg-black/60 backdrop-blur-sm z-50"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-navy-dark shadow-2xl z-50 flex flex-col border-l border-gray-100 dark:border-white/10"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/10">
                <h2 className="text-xl font-bold text-navy dark:text-white flex items-center gap-2">
                  <ShoppingBag className="text-bronze" /> 
                  Mon Panier
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-navy dark:hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {orderComplete ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                    <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">Commande Réussie !</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Merci. Nous avons bien reçu votre demande.</p>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-8 shadow-sm">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Votre Code de Suivi :</p>
                      <p className="text-3xl font-extrabold text-bronze tracking-widest">{trackingCode}</p>
                      <p className="text-xs text-gray-400 mt-3">Copiez ce code pour suivre l'état de votre commande dans la page "Suivi".</p>
                    </div>

                    <button 
                      onClick={closeAndResetCart}
                      className="w-full py-4 bg-navy hover:bg-navy-light dark:bg-bronze dark:hover:bg-bronze-light text-white dark:text-navy rounded-xl font-bold transition-colors"
                    >
                      Fermer le panier
                    </button>
                  </motion.div>
                ) : cart.length === 0 ? (
                  <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Votre panier est vide</p>
                  </div>
                ) : isCheckout ? (
                  <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <h3 className="font-bold text-navy dark:text-white mb-4">Informations de livraison</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom Complet</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy text-navy dark:text-white focus:outline-none focus:border-bronze" placeholder="Anis Benali" value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                      <input type="tel" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy text-navy dark:text-white focus:outline-none focus:border-bronze" placeholder="0550 00 00 00" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wilaya</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy text-navy dark:text-white focus:outline-none focus:border-bronze" placeholder="Alger" value={customerInfo.wilaya} onChange={e => setCustomerInfo({...customerInfo, wilaya: e.target.value})} />
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center bg-gray-50 dark:bg-navy/40 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-bold text-navy dark:text-white text-sm">{item.name}</h4>
                          <div className="text-bronze font-semibold">{item.price} DA</div>
                          <div className="text-xs text-gray-500">Qté: {item.qty}</div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500 p-2">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {!orderComplete && cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-navy/20">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Total</span>
                    <span className="text-2xl font-extrabold text-navy dark:text-white">{totalPrice} DA</span>
                  </div>
                  
                  {isCheckout ? (
                    <div className="flex gap-3">
                      <button onClick={() => setIsCheckout(false)} className="px-4 py-4 bg-gray-200 dark:bg-gray-700 text-navy dark:text-white rounded-xl font-bold flex-1 transition-colors">
                        Retour
                      </button>
                      <button type="submit" form="checkout-form" className="py-4 bg-bronze hover:bg-bronze-light text-white rounded-xl font-bold flex-[2] shadow-lg shadow-bronze/20 transition-colors">
                        Confirmer
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setIsCheckout(true)} className="w-full py-4 bg-navy hover:bg-navy-light dark:bg-bronze dark:hover:bg-bronze-light text-white dark:text-navy rounded-xl font-bold shadow-lg transition-colors">
                      Valider le Panier
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Boutique;