
export type Category = 'Hair' | 'Skin' | 'Makeup' | 'Salon Equipment' | 'Professional Tools';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Lead {
  id: string;
  type: 'Contact' | 'Bulk';
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
}

export interface CmsData {
  products: Product[];
  posts: Post[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  leads: Lead[];
  theme: ThemeSettings;
}
