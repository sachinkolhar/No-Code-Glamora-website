
import React, { useState } from 'react';
import { useCms } from '../store';

const BulkOrders: React.FC = () => {
  const { addLead } = useCms();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch("https://formspree.io/f/xjgekdwa", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          subject: "New Salon Partnership Application - Glamora"
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        addLead({ ...formData, type: 'Bulk' });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
    }
  };

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-6">Salon Partnership Program</h1>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Elevate your salon's service quality with our professional-grade bulk supplies. Enjoy wholesale pricing, priority shipping, and dedicated account management.
          </p>
        </div>

        <div className="bg-white p-12 shadow-sm border border-gray-100">
          {status === 'success' ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-serif font-bold mb-4">Application Sent</h2>
              <p className="text-gray-500">A partnership manager will review your salon profile and reach out within 48 hours.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-xs font-bold uppercase tracking-widest border-b border-black pb-1">Submit Another Application</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-3">Salon Name / Owner</label>
                  <input required type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-pink-400" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-3">Professional Email</label>
                  <input required type="email" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-pink-400" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-3">Contact Phone</label>
                  <input required type="tel" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-pink-400" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-3">Estimated Monthly Volume</label>
                  <select className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-pink-400 bg-transparent">
                    <option>$500 - $2,000</option>
                    <option>$2,000 - $5,000</option>
                    <option>$5,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-3">Primary Needs & Brand Interests</label>
                <textarea rows={4} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-pink-400 resize-none" placeholder="Tell us about your salon's requirements..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-xs">There was an error sending your application. Please try again.</p>
              )}
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-black text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50"
              >
                {status === 'submitting' ? 'Submitting Application...' : 'Submit Partnership Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkOrders;
