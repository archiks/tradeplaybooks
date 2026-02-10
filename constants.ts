
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_starter',
    name: 'Starter Shopify Store',
    price: 250,
    level: 1,
    tagline: 'Perfect for first-time merchants.',
    description: 'A complete, ready-to-sell Shopify store with essential apps and branding.',
    features: [
      'Premium Theme Installation',
      'Mobile Responsive Design',
      'Payment Gateway Setup',
      '10 Winning Products Loaded',
      'Basic SEO Optimization',
      'Standard Support'
    ]
  },
  {
    id: 'prod_growth',
    name: 'Growth Shopify Store',
    price: 500,
    level: 2,
    tagline: 'Designed for scaling and ads.',
    description: 'Everything in Starter plus advanced apps, email marketing setup, and higher conversion optimization.',
    features: [
      'Everything in Starter',
      'Advanced App Integration',
      'Email Marketing Setup',
      'Social Media Integration',
      '20 Winning Products Loaded',
      'Speed Optimization',
      'Priority Support'
    ]
  },
  {
    id: 'prod_premium',
    name: 'Premium Shopify Store',
    price: 1000,
    level: 3,
    tagline: 'The ultimate brand dominance package.',
    description: 'A fully custom-branded store with custom coding, intense SEO, and 1-on-1 strategy.',
    features: [
      'Everything in Growth',
      'Custom Branding & Logo',
      'Advanced SEO & Copywriting',
      '50 Winning Products Loaded',
      '1-on-1 Strategy Call',
      'Dedicated Success Manager',
      'Lifetime Updates'
    ]
  }
];

export const TESTIMONIALS = [
  {
    initials: "MJ",
    name: "Michael J.",
    role: "Dropshipper",
    text: "I tried for months to build a store myself. Garsabers built me a professional store in 3 days and I made my first sale 24 hours later."
  },
  {
    initials: "Sarah K.",
    name: "Sarah K.",
    role: "Boutique Owner",
    text: "The branding package was incredible. My store looks like a million dollar brand. Highly recommended."
  },
  {
    initials: "DP",
    name: "David P.",
    role: "E-com Entrepreneur",
    text: "The 'Growth' package paid for itself in the first week. The pre-loaded products were actually winners."
  }
];

export const PAIN_POINTS = [
  "Struggling to find winning products",
  "Confused by Shopify theme customization",
  "Wasting money on ineffective ads",
  "Low conversion rates and high bounce rates",
  "Technical headaches with payment gateways",
  "Overwhelmed by fulfillment logistics",
  "Lack of branding consistency",
  "No clear strategy for scaling"
];

export const COUNTRIES = [
  "United Kingdom", "United States", "Germany", "France", "Italy",
  "Spain", "Netherlands", "Switzerland", "Canada", "Australia",
  "Japan", "Singapore", "United Arab Emirates", "South Africa", "Norway"
];
