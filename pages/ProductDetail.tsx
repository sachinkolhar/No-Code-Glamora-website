
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCms } from '../store';

const ProductDetail: React.FC = () => {
  const { slug } = useParams();
  const { products } = useCms();
  const product = products.find(p => p.slug === slug);

  if (!product) return (
    <div className="py-40 text-center">
      <h2 className="text-3xl font-serif mb-6">Product Not Found</h2>
      <Link to="/products" className="text-pink-500 font-bold uppercase tracking-widest border-b-2 border-pink-200">Back to Store</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex text-[10px] uppercase tracking-widest text-gray-400 mb-12">
          <Link to="/">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="bg-gray-50 aspect-square overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-400 mb-4">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{product.name}</h1>
            <p className="text-2xl font-light mb-8">${product.price}</p>
            <div className="prose prose-sm text-gray-500 mb-10 leading-relaxed max-w-lg">
              <p>{product.description}</p>
            </div>
            
            <div className="space-y-6">
              <button className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-custom">
                Add to Cart
              </button>
              <div className="pt-8 border-t border-gray-100 flex gap-10">
                <div className="text-center">
                  <span className="block text-[10px] font-bold uppercase mb-1">Authentic</span>
                  <div className="w-4 h-4 bg-green-100 rounded-full mx-auto"></div>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-bold uppercase mb-1">Professional</span>
                  <div className="w-4 h-4 bg-blue-100 rounded-full mx-auto"></div>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-bold uppercase mb-1">Ships Fast</span>
                  <div className="w-4 h-4 bg-orange-100 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="pt-24 border-t border-gray-100">
            <h2 className="text-2xl font-serif font-bold mb-12">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map(p => (
                <Link to={`/product/${p.slug}`} key={p.id} className="group">
                  <div className="aspect-square bg-gray-50 overflow-hidden mb-6">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-sm font-bold mb-1">{p.name}</h3>
                    <p className="text-xs text-pink-500">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
