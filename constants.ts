
import { Product, Post, Testimonial, FAQ, ThemeSettings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Radiance Facial Oil',
    category: 'Skin',
    price: 85,
    description: 'A luxurious blend of botanical oils for a luminous, hydrated glow.',
    image: 'https://picsum.photos/seed/skin1/600/600',
    isFeatured: true,
    slug: 'silk-radiance-facial-oil'
  },
  {
    id: '2',
    name: 'Pro-V Titanium Hair Dryer',
    category: 'Salon Equipment',
    price: 249,
    description: 'Ultra-fast drying with ionic technology for professional salon results.',
    image: 'https://picsum.photos/seed/hair1/600/600',
    isFeatured: true,
    slug: 'pro-v-titanium-hair-dryer'
  },
  {
    id: '3',
    name: 'Velvet Matte Lipstick Kit',
    category: 'Makeup',
    price: 45,
    description: 'Long-lasting pigmentation with a weightless, creamy feel.',
    image: 'https://picsum.photos/seed/makeup1/600/600',
    isFeatured: false,
    slug: 'velvet-matte-lipstick-kit'
  },
  {
    id: '4',
    name: 'Keratin Repair Shampoo',
    category: 'Hair',
    price: 32,
    description: 'Restores strength and elasticity to damaged hair strands.',
    image: 'https://picsum.photos/seed/hair2/600/600',
    isFeatured: true,
    slug: 'keratin-repair-shampoo'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'Top 5 Salon Trends for 2024',
    content: 'The beauty industry is evolving faster than ever...',
    excerpt: 'Discover what is trending in the world of professional hair and makeup.',
    image: 'https://picsum.photos/seed/blog1/800/400',
    category: 'Trends',
    author: 'Elena Rose',
    date: 'Oct 24, 2023',
    slug: 'top-5-salon-trends-2024'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Owner, Luxe Hair Studio',
    content: 'Glamora has transformed my salon inventory. The quality of their professional tools is unmatched.',
    avatar: 'https://picsum.photos/seed/user1/100/100'
  }
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'Do you offer bulk discounts for salons?',
    answer: 'Yes, we have a specialized partnership program for salon owners and professional stylists.'
  }
];

export const DEFAULT_THEME: ThemeSettings = {
  primaryColor: '#e5c1cd',
  secondaryColor: '#f5f5dc',
  accentColor: '#fadadd',
  fontHeading: "'Playfair Display', serif",
  fontBody: "'Inter', sans-serif"
};
