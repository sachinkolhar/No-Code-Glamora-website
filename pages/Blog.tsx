
import React from 'react';
import { useCms } from '../store';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const { posts } = useCms();

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif font-bold mb-6">Beauty Insights</h1>
          <p className="text-gray-400 uppercase tracking-widest text-xs">Trends, Tips & Professional Advice</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {posts.map(post => (
            <article key={post.id} className="group flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden bg-gray-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-4">{post.category} — {post.date}</p>
                <h2 className="text-2xl font-serif font-bold mb-4 leading-tight group-hover:text-pink-500 transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:border-pink-400 transition-all">
                  Read Article
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-32 bg-pink-50 p-20 text-center">
          <div className="max-w-xl mx-auto">
            <h3 className="text-3xl font-serif font-bold mb-6">Never Miss a Trend</h3>
            <p className="text-gray-500 mb-10 leading-relaxed">Join 10,000+ beauty professionals and enthusiasts who receive our weekly insights.</p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your best email..." className="flex-grow px-6 py-4 text-sm focus:outline-none focus:border-pink-300 border border-transparent" />
              <button className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">Subscribe Now</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
