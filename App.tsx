
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CmsProvider, useCms } from './store';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BulkOrders from './pages/BulkOrders';
import AdminDashboard from './admin/AdminDashboard';

const Header: React.FC = () => {
  const { theme } = useCms();
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold font-serif tracking-wider" style={{ color: '#333' }}>
          GLAMORA
        </Link>
        <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
          <Link to="/" className="hover:text-pink-400 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-pink-400 transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-pink-400 transition-colors">About</Link>
          <Link to="/blog" className="hover:text-pink-400 transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-pink-400 transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/bulk" className="bg-charcoal text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all" style={{ backgroundColor: '#333' }}>
            Bulk Inquiry
          </Link>
          <Link to="/admin" className="text-gray-400 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-serif font-bold mb-6">GLAMORA</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Your premier destination for professional-grade beauty and salon supplies. Elevating industry standards through luxury and innovation.
            </p>
            <div className="flex space-x-4">
              <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center cursor-pointer hover:bg-pink-200 transition-colors"><i className="text-pink-600">ig</i></span>
              <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center cursor-pointer hover:bg-pink-200 transition-colors"><i className="text-pink-600">fb</i></span>
              <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center cursor-pointer hover:bg-pink-200 transition-colors"><i className="text-pink-600">yt</i></span>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Navigation</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/blog">Beauty Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Categories</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>Hair Care</li>
              <li>Professional Tools</li>
              <li>Skincare</li>
              <li>Salon Furniture</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Newsletter</h3>
            <p className="text-gray-500 text-xs mb-4">Subscribe for exclusive offers and tips.</p>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="bg-white border border-gray-200 px-4 py-2 w-full text-xs focus:outline-none focus:border-pink-300" />
              <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase">Join</button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest">
          <p>© 2024 GLAMORA BEAUTY & SALON. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CmsProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bulk" element={<BulkOrders />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </CmsProvider>
  );
};

export default App;
