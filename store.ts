
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CmsData, Product, Post, Testimonial, FAQ, Lead, ThemeSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_POSTS, INITIAL_TESTIMONIALS, INITIAL_FAQS, DEFAULT_THEME } from './constants';

interface CmsContextType extends CmsData {
  updateProducts: (products: Product[]) => void;
  updatePosts: (posts: Post[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateFaqs: (faqs: FAQ[]) => void;
  addLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
  updateTheme: (theme: ThemeSettings) => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CmsData>(() => {
    const saved = localStorage.getItem('glamora_cms_data');
    if (saved) return JSON.parse(saved);
    return {
      products: INITIAL_PRODUCTS,
      posts: INITIAL_POSTS,
      testimonials: INITIAL_TESTIMONIALS,
      faqs: INITIAL_FAQS,
      leads: [],
      theme: DEFAULT_THEME
    };
  });

  useEffect(() => {
    localStorage.setItem('glamora_cms_data', JSON.stringify(data));
  }, [data]);

  const updateProducts = (products: Product[]) => setData(prev => ({ ...prev, products }));
  const updatePosts = (posts: Post[]) => setData(prev => ({ ...prev, posts }));
  const updateTestimonials = (testimonials: Testimonial[]) => setData(prev => ({ ...prev, testimonials }));
  const updateFaqs = (faqs: FAQ[]) => setData(prev => ({ ...prev, faqs }));
  const updateTheme = (theme: ThemeSettings) => setData(prev => ({ ...prev, theme }));

  const addLead = (lead: Omit<Lead, 'id' | 'date'>) => {
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    setData(prev => ({ ...prev, leads: [newLead, ...prev.leads] }));
  };

  // Replaced JSX with React.createElement to fix syntax errors in store.ts
  return React.createElement(
    CmsContext.Provider,
    {
      value: {
        ...data,
        updateProducts,
        updatePosts,
        updateTestimonials,
        updateFaqs,
        addLead,
        updateTheme
      }
    },
    children
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) throw new Error('useCms must be used within a CmsProvider');
  return context;
};
