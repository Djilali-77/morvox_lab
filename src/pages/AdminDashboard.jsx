import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { motion } from 'framer-motion';
import { LogOut, Download, Package, Clock, ShieldCheck, Mail, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchOrders();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchOrders();
    });
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('custom_orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching orders:', error);
    else setOrders(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert('Login failed: ' + error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOrders([]);
  };

  // فونكسيون جديدة نتاع الحذف
  const handleDelete = async (id) => {
    // نخرجو ميساج تأكيد باش ما يتسيبريميش بالغلط
    const confirmDelete = window.confirm("Are you sure you want to delete this order? \n(Did you finish and deliver it?)");
    
    if (!confirmDelete) return;

    // نمسحو من الداتابيز
    const { error } = await supabase
      .from('custom_orders')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting order: ' + error.message);
    } else {
      // نقلعوه من الطابلو ديريكت بلا ما نديرو Refresh
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-navy-dark flex items-center justify-center px-4 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-navy/40 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <ShieldCheck size={48} className="mx-auto text-bronze mb-4" />
            <h1 className="text-2xl font-bold text-navy dark:text-white">Admin Access</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Restricted area. Morvox Lab staff only.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy-dark text-navy dark:text-white focus:outline-none focus:border-bronze"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy dark:text-gray-300 mb-1">Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy-dark text-navy dark:text-white focus:outline-none focus:border-bronze"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-navy dark:bg-bronze text-white dark:text-navy rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-dark pt-24 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy dark:text-white flex items-center gap-3">
              <Package className="text-bronze" /> 
              Orders Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your custom part requests.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg font-medium transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="bg-white dark:bg-navy/40 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                  <th className="p-4 text-sm font-semibold text-navy dark:text-gray-300">Date</th>
                  <th className="p-4 text-sm font-semibold text-navy dark:text-gray-300">Client Info</th>
                  <th className="p-4 text-sm font-semibold text-navy dark:text-gray-300">Material</th>
                  <th className="p-4 text-sm font-semibold text-navy dark:text-gray-300">Description</th>
                  <th className="p-4 text-sm font-semibold text-navy dark:text-gray-300">File</th>
                  {/* زدنا خانة Actions */}
                  <th className="p-4 text-sm font-semibold text-navy dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No orders yet. They will appear here when clients submit requests.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-navy dark:text-white">{order.full_name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{order.email}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{order.phone}</p>
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-2 py-1 bg-bronze/10 text-bronze text-xs font-bold rounded">
                          {order.material}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{order.color}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        {order.description}
                      </td>
                      <td className="p-4">
                        {order.file_url ? (
                          <a 
                            href={order.file_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-navy dark:bg-white/10 text-white dark:text-white hover:bg-navy-light dark:hover:bg-white/20 rounded-md text-sm font-medium transition-colors"
                          >
                            <Download size={16} /> File
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400 italic">No file</span>
                        )}
                      </td>
                      {/* البوطونات الجدد نتاع الإيميل والحذف */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <a 
                            href={`mailto:${order.email}?subject=Morvox Lab - Regarding Your Custom 3D Printing Order`}
                            title="Contact Client"
                            className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-md transition-colors"
                          >
                            <Mail size={18} />
                          </a>
                          <button 
                            onClick={() => handleDelete(order.id)}
                            title="Mark as Done / Delete"
                            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-md transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;