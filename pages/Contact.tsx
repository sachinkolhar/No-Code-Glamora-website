
import React, { useState } from 'react';
import { useCms } from '../store';

const Contact: React.FC = () => {
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
          subject: "New Contact Form Submission - Glamora"
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Also save to local CMS for admin dashboard visibility
        addLead({ ...formData, type: 'Contact' });
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
    }
  };

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <h1 className="text-5xl font-serif font-bold mb-8 leading-tight">Get in <span className="text-pink-400">Touch.</span></h1>
              <p className="text-gray-500 leading-relaxed mb-12 max-w-md">
                Have questions about our professional lines or need help choosing the right equipment for your salon? Our team of beauty specialists is here to assist.
              </p>

              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-10 h-10 bg-pink-50 flex items-center justify-center text-pink-500"><i className="not-italic">📍</i></div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Visit Us</h4>
                    <p className="text-sm text-gray-400">123 Beauty Plaza, Fifth Avenue, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-10 h-10 bg-pink-50 flex items-center justify-center text-pink-500"><i className="not-italic">📞</i></div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Call Us</h4>
                    <p className="text-sm text-gray-400">+1 (800) GLAMORA-SALON</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-10 h-10 bg-pink-50 flex items-center justify-center text-pink-500"><i className="not-italic">✉️</i></div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Support</h4>
                    <p className="text-sm text-gray-400">concierge@glamora.beauty</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-10 md:p-16 shadow-2xl">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">Message Received</h3>
                  <p className="text-gray-500 text-sm">Thank you for reaching out. A specialist will contact you within 24 business hours.</p>
                  <button onClick={() => setStatus('idle')} className="mt-8 text-xs font-bold uppercase tracking-widest border-b border-black pb-1">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition-all"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400">Your Inquiry</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-sm focus:outline-none focus:border-pink-300 transition-all resize-none"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  {status === 'error' && (
                    <p className="text-red-500 text-xs">There was an error sending your message. Please try again.</p>
                  )}
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-black text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-custom disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
