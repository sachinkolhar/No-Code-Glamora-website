
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="order-2 lg:order-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-pink-400 mb-4">Our Legacy</h2>
            <h1 className="text-5xl font-serif font-bold mb-10 leading-tight">Crafting Beauty Since 2008.</h1>
            <div className="space-y-6 text-gray-500 leading-relaxed text-lg">
              <p>
                Glamora was founded on a simple yet powerful premise: professional beauty artists deserve a partner that cares as much about quality as they do.
              </p>
              <p>
                What started as a small specialty supply shop in Manhattan has grown into a global destination for premium salon equipment, curated skincare, and high-performance makeup.
              </p>
              <p>
                We believe that the right tools don't just facilitate work—they inspire art. Our mission is to empower professionals and enthusiasts alike with the finest products the industry has to offer.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img src="https://picsum.photos/seed/aboutmain/1000/1200" className="w-full h-auto shadow-2xl" alt="About Glamora" />
          </div>
        </div>

        {/* Mission / Values */}
        <div className="bg-gray-50 p-20 text-center mb-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 italic">"True beauty is an expression of character and quality."</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Integrity</h4>
                <p className="text-sm text-gray-400">We source only 100% authentic, industry-certified products.</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Innovation</h4>
                <p className="text-sm text-gray-400">Constantly scouting for the latest trends and tech in beauty.</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Community</h4>
                <p className="text-sm text-gray-400">Supporting thousands of salon owners globally.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-center mb-16">The Visionaries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: 'Isabella Vance', role: 'Founder & CEO', img: 'https://picsum.photos/seed/team1/400/500' },
              { name: 'Marcus Sterling', role: 'Head of Salon Partnerships', img: 'https://picsum.photos/seed/team2/400/500' },
              { name: 'Elena Rose', role: 'Creative Director', img: 'https://picsum.photos/seed/team3/400/500' }
            ].map(member => (
              <div key={member.name} className="group">
                <div className="aspect-[4/5] overflow-hidden mb-6 bg-gray-100">
                  <img src={member.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={member.name} />
                </div>
                <h4 className="font-serif text-xl font-bold">{member.name}</h4>
                <p className="text-xs uppercase tracking-widest text-pink-400 mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
