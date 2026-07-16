import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/ui/Hero';
import Store from './pages/Store';
import Education from './pages/Education';
import CustomOrders from './pages/CustomOrders';
import AdminDashboard from './pages/AdminDashboard';
import OrderTracking from './pages/OrderTracking';
import WhatsAppButton from './components/ui/WhatsAppButton';
import Portfolio from './pages/Portfolio';
import ProductCustomizer from './components/ProductCustomizer';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-gray-50 text-navy dark:bg-navy-dark dark:text-white transition-colors duration-300 relative"> {/* <-- زدت relative هنا */}
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/store" element={<Store />} />
            <Route path="/education" element={<Education />} />
            <Route path="/custom" element={<CustomOrders />} />
            <Route path="/admin" element={<AdminDashboard />} /> 
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/custom-3d" element={<ProductCustomizer />} />
            <Route path="/oreder_track" element={<OrderTracking />} />
          </Routes>
        </main>
        
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;