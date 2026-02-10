
import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../store';

const Home: React.FC = () => {
  const { products, testimonials, faqs, theme } = useCms();
  const featured = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <img 
          src="https://picsum.photos/seed/glamorahero/1920/1080" 
          alt="Luxury Salon" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                Luxury Defined by <span className="text-pink-200">Excellence.</span>
              </h1>
              <p className="text-lg md:text-xl mb-10 opacity-90 leading-relaxed font-light">
                Discover professional beauty essentials and high-end salon supplies curated for the world's most demanding artists.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="bg-white text-black px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-custom inline-block text-center">
                  Shop the Collection
                </Link>
                <Link to="/contact" className="border-2 border-white text-white px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-custom inline-block text-center">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-pink-400 mb-3">Curated Selection</h2>
            <p className="text-3xl md:text-4xl font-serif font-bold">Industry Standard Essentials</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {['Skin', 'Hair', 'Makeup', 'Salon Equipment'].map((cat, i) => (
              <Link to={`/products?category=${cat}`} key={cat} className="group relative aspect-square overflow-hidden bg-gray-100">
                <img src={`https://picsum.photos/seed/cat${i}/800/800`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-custom flex items-center justify-center">
                  <span className="text-white font-serif text-xl md:text-2xl font-bold tracking-wider">{cat}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-pink-400 mb-3">Seasonal Picks</h2>
              <p className="text-3xl md:text-4xl font-serif font-bold">Our Best Sellers</p>
            </div>
            <Link to="/products" className="text-sm font-bold uppercase tracking-widest border-b-2 border-pink-200 pb-1 mt-6 md:mt-0 hover:border-pink-400 transition-all">
              View All Products
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <div key={product.id} className="group bg-white p-4 transition-custom hover:shadow-xl">
                <Link to={`/product/${product.slug}`}>
                  <div className="aspect-square overflow-hidden bg-gray-50 mb-6">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </Link>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{product.category}</p>
                  <h3 className="font-serif text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-pink-500 font-medium">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img src="https://picsum.photos/seed/benefit/800/1000" className="w-full h-auto" alt="Luxury Beauty" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pink-50 -z-10 hidden lg:block"></div>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-pink-400 mb-3">Why Glamora</h2>
              <h3 className="text-4xl font-serif font-bold mb-8 leading-tight">Elevating Beauty Through Superior Standards</h3>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-pink-100 flex-shrink-0 flex items-center justify-center rounded-full">
                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Authentic Products</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Direct partnerships with global luxury brands ensure 100% authenticity in every purchase.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-pink-100 flex-shrink-0 flex items-center justify-center rounded-full">
                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Expert Knowledge</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Over 15 years of industry experience supporting professional salons and independent artists.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-pink-100 flex-shrink-0 flex items-center justify-center rounded-full">
                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Next-Day Delivery</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">We understand salon demands. That's why we offer rapid logistics for all salon supply orders.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-pink-400 mb-3">Partner Testimonials</h2>
            <p className="text-3xl md:text-4xl font-serif font-bold">Trusted by Industry Experts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.id} className="bg-white p-10 border border-gray-100 text-center">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-6">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <p className="italic text-gray-500 text-sm mb-6 leading-relaxed">"{t.content}"</p>
                <h4 className="font-bold text-sm tracking-widest uppercase">{t.name}</h4>
                <p className="text-[10px] text-pink-400 uppercase mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Order CTA */}
      <section className="py-24 bg-charcoal text-white text-center" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Scale Your Salon with Glamora</h2>
          <p className="text-lg opacity-70 mb-12">Looking for professional-grade supplies in bulk? Join our partnership program and unlock exclusive trade pricing and concierge support.</p>
          <Link to="/bulk" className="inline-block bg-white text-black px-12 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-custom">
            Inquire About Bulk Orders
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
