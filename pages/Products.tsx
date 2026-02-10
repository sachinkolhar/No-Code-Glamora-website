
import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCms } from '../store';
import { Category } from '../types';

const Products: React.FC = () => {
  const { products } = useCms();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  const activeCategory = searchParams.get('category') || 'All';
  const categories: (Category | 'All')[] = ['All', 'Hair', 'Skin', 'Makeup', 'Salon Equipment', 'Professional Tools'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, searchTerm]);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Collection</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs">Excellence in every detail</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Search</h3>
              <input 
                type="text" 
                placeholder="Find products..." 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-pink-300 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Categories</h3>
              <ul className="space-y-4">
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                      className={`text-sm uppercase tracking-widest hover:text-pink-400 transition-colors ${activeCategory === cat ? 'text-pink-500 font-bold' : 'text-gray-500'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-widest">Showing {filteredProducts.length} Results</p>
              <select className="bg-transparent text-xs uppercase tracking-widest focus:outline-none cursor-pointer">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <div key={product.id} className="group relative">
                    <Link to={`/product/${product.slug}`}>
                      <div className="aspect-[4/5] bg-gray-50 overflow-hidden mb-6">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        {product.isFeatured && (
                          <div className="absolute top-4 left-4 bg-pink-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                            Bestseller
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{product.category}</p>
                        <h3 className="font-serif text-xl font-bold mb-3">{product.name}</h3>
                        <p className="text-pink-500 font-medium">${product.price}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50">
                <p className="text-gray-400 italic">No products found in this selection.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSearchParams({});}}
                  className="mt-4 text-xs font-bold uppercase tracking-widest border-b border-black pb-1"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
