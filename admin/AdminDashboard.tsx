
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useCms } from '../store';
import { Product, Post, Lead } from '../types';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: 'Overview', path: '/admin', icon: '📊' },
    { label: 'Products', path: '/admin/products', icon: '💄' },
    { label: 'Blog Posts', path: '/admin/blog', icon: '✍️' },
    { label: 'Leads', path: '/admin/leads', icon: '📩' },
    { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-xl font-serif font-bold tracking-widest">GLAMORA</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {links.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${location.pathname === link.path ? 'bg-pink-50 text-pink-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:text-black transition-all">
            <span>🏠</span> Back to Site
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
};

const Overview: React.FC = () => {
  const { products, leads, posts } = useCms();
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-10">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 border border-gray-200 rounded-xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Total Products</p>
          <p className="text-4xl font-serif font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-8 border border-gray-200 rounded-xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">New Leads</p>
          <p className="text-4xl font-serif font-bold text-pink-500">{leads.length}</p>
        </div>
        <div className="bg-white p-8 border border-gray-200 rounded-xl">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Blog Articles</p>
          <p className="text-4xl font-serif font-bold">{posts.length}</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Recent Leads</h3>
        <div className="space-y-4">
          {leads.slice(0, 5).map(lead => (
            <div key={lead.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-bold text-sm">{lead.name}</p>
                <p className="text-xs text-gray-400">{lead.type} inquiry</p>
              </div>
              <p className="text-xs text-gray-400">{new Date(lead.date).toLocaleDateString()}</p>
            </div>
          ))}
          {leads.length === 0 && <p className="text-center text-gray-400 italic py-8">No leads collected yet.</p>}
        </div>
      </div>
    </div>
  );
};

const ProductManager: React.FC = () => {
  const { products, updateProducts } = useCms();
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  const handleDelete = (id: string) => {
    updateProducts(products.filter(p => p.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    
    if (editing.id) {
      updateProducts(products.map(p => p.id === editing.id ? (editing as Product) : p));
    } else {
      const newProduct = {
        ...editing,
        id: Math.random().toString(36).substr(2, 9),
        slug: (editing.name || '').toLowerCase().replace(/ /g, '-')
      } as Product;
      updateProducts([...products, newProduct]);
    }
    setEditing(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-serif font-bold">Manage Inventory</h1>
        <button 
          onClick={() => setEditing({ name: '', price: 0, category: 'Skin', description: '', image: '', isFeatured: false })}
          className="bg-black text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest"
        >
          Add Product
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p.id} className="text-sm hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4"><img src={p.image} className="w-12 h-12 rounded object-cover" /></td>
                <td className="px-6 py-4 font-bold">{p.name}</td>
                <td className="px-6 py-4 text-gray-500">{p.category}</td>
                <td className="px-6 py-4">${p.price}</td>
                <td className="px-6 py-4">
                  {p.isFeatured ? <span className="text-[10px] bg-pink-50 text-pink-500 px-2 py-1 rounded-full font-bold uppercase tracking-widest">Featured</span> : '--'}
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <button onClick={() => setEditing(p)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
          <div className="bg-white w-full max-w-2xl rounded-xl p-10 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-serif font-bold mb-8">{editing.id ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold mb-2">Product Name</label>
                  <input required className="w-full border border-gray-200 rounded-lg p-3" value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">Price ($)</label>
                  <input required type="number" className="w-full border border-gray-200 rounded-lg p-3" value={editing.price} onChange={e => setEditing({...editing, price: Number(e.target.value)})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold mb-2">Category</label>
                  <select className="w-full border border-gray-200 rounded-lg p-3" value={editing.category} onChange={e => setEditing({...editing, category: e.target.value as any})}>
                    <option>Hair</option>
                    <option>Skin</option>
                    <option>Makeup</option>
                    <option>Salon Equipment</option>
                    <option>Professional Tools</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">Image URL</label>
                  <input className="w-full border border-gray-200 rounded-lg p-3" value={editing.image} onChange={e => setEditing({...editing, image: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-2">Description</label>
                <textarea rows={4} className="w-full border border-gray-200 rounded-lg p-3" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})}></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editing.isFeatured} onChange={e => setEditing({...editing, isFeatured: e.target.checked})} id="isFeatured" />
                <label htmlFor="isFeatured" className="text-xs font-bold">Featured on Home Page</label>
              </div>
              <div className="flex gap-4 pt-6 border-t">
                <button type="submit" className="bg-black text-white px-8 py-3 rounded-lg font-bold">Save Changes</button>
                <button type="button" onClick={() => setEditing(null)} className="bg-gray-100 px-8 py-3 rounded-lg font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const LeadManager: React.FC = () => {
  const { leads } = useCms();
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-10">Form Submissions</h1>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map(l => (
              <tr key={l.id} className="text-sm">
                <td className="px-6 py-4 text-gray-400">{new Date(l.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${l.type === 'Bulk' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                    {l.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold">{l.name}</td>
                <td className="px-6 py-4">
                  <div className="text-xs">{l.email}</div>
                  <div className="text-xs text-gray-400">{l.phone}</div>
                </td>
                <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{l.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <div className="text-center py-20 text-gray-400 italic">No leads found.</div>}
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/products" element={<ProductManager />} />
        <Route path="/blog" element={<div className="text-center py-20 text-gray-400">Blog Manager coming soon...</div>} />
        <Route path="/leads" element={<LeadManager />} />
        <Route path="/settings" element={<div className="text-center py-20 text-gray-400">Settings & Theme Editor coming soon...</div>} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
