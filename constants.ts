import { Product } from './types';

// Print runs sold on the landing page. Prices are in EUR, excl. VAT.
// IDs are shared with the checkout + admin backend, keep them stable.
export const PRODUCTS: Product[] = [
  {
    id: 'prod_starter',
    name: 'Starter run',
    price: 250,
    level: 1,
    quantity: '100 boxes',
    tagline: 'For a first branded batch or a product launch.',
    description: '100 corrugated mailer boxes with your logo printed in one colour on the outside.',
    features: [
      'White or kraft mailer boxes',
      'One-colour logo print, outside',
      '6 stock sizes to choose from',
      'Digital proof before printing',
      'Ready to ship in 10 working days'
    ]
  },
  {
    id: 'prod_growth',
    name: 'Brand run',
    price: 500,
    level: 2,
    quantity: '300 boxes',
    tagline: 'For brands shipping every week.',
    description: '300 mailer boxes or shipping cartons, full-colour outside with a one-colour inside print.',
    features: [
      'Mailer boxes or shipping cartons',
      'Full-colour print, outside',
      'One-colour print, inside lid',
      'Custom size to the millimetre',
      'Two rounds of proof changes',
      'Ready to ship in 7–10 working days'
    ]
  },
  {
    id: 'prod_premium',
    name: 'Signature run',
    price: 1000,
    level: 3,
    quantity: '150 rigid boxes or 750 mailers',
    tagline: 'For gift sets, launches and premium unboxing.',
    description: 'Rigid gift boxes or mailers with full-colour print inside and out, plus a foil or emboss finish.',
    features: [
      'Rigid gift boxes or mailer boxes',
      'Full-colour print, inside and out',
      'Hot foil or embossed logo',
      'Matte or soft-touch lamination',
      'Physical sample before the full run',
      'Priority production, 7 working days'
    ]
  }
];

export const COUNTRIES = [
  "United Kingdom", "United States", "Germany", "France", "Italy",
  "Spain", "Netherlands", "Switzerland", "Canada", "Australia",
  "Japan", "Singapore", "United Arab Emirates", "South Africa", "Norway",
  "Latvia", "Lithuania", "Estonia", "Poland", "Ireland"
];
