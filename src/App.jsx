import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/ui/Hero';
import Boutique from './pages/Boutique';
import Formation from './pages/Formation';
import Custom from './pages/Custom';
import AdminDashboard from './pages/AdminDashboard';
import Suivi from './pages/Suivi';
import WhatsAppButton from './components/ui/WhatsAppButton';
import Portfolio from './pages/Portfolio';
import Studio3D from './components/Studio3D';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-gray-50 text-navy dark:bg-navy-dark dark:text-white transition-colors duration-300 relative"> {/* <-- زدت relative هنا */}
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/formation" element={<Formation />} />
            <Route path="/custom" element={<Custom />} />
            <Route path="/admin" element={<AdminDashboard />} /> 
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/studio3d" element={<Studio3D />} />
            <Route path="/suivi" element={<Suivi />} />
          </Routes>
        </main>
        
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;