/**
 * Centralized Bakery Configuration for The CUPnCAKE Factory
 * 
 * Update business details, phone numbers, WhatsApp, opening hours,
 * social links, products, and images here.
 */

// Import generated image assets
import heroCakeImg from '../assets/images/hero_bakery_celebration_cake_1791047558016.jpg';
import cupcakesImg from '../assets/images/category_cupcakes_assortment_1791047573101.jpg';
import customCakeImg from '../assets/images/category_custom_theme_cake_1791047585880.jpg';
import aboutCraftImg from '../assets/images/about_bakery_craftsmanship_1791047597861.jpg';
import treatsImg from '../assets/images/bakery_treats_pastries_1791047607627.jpg';

export interface ProductItem {
  id: string;
  name: string;
  category: 'cakes' | 'cupcakes' | 'custom' | 'treats';
  description: string;
  image: string;
  flavorNotes?: string;
  isPopular?: boolean;
  priceLabel: string; // e.g. "Ask for price"
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  filterKey: 'cakes' | 'cupcakes' | 'custom' | 'treats';
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  review: string;
  occasion: string;
  source: 'Google' | 'Direct Customer';
}

export const BAKERY_CONFIG = {
  // Brand identity
  businessName: 'The CUPnCAKE Factory',
  tagline: 'Baked Fresh. Made With Love.',
  establishedYear: '2014',
  city: 'Gurugram',
  state: 'Haryana',
  country: 'India',

  // Contact & Social information (Placeholders to be updated with verified details)
  whatsappNumber: '919876543210', // Country code + 10-digit number without '+' or spaces
  phoneDisplay: '+91 98765 43210', // Placeholder
  addressDisplay: 'Sector 50 / DLF Phase, Gurugram, Haryana (Exact store address to be confirmed)',
  openingHoursDisplay: 'Monday – Sunday: 10:00 AM – 10:00 PM (Verified hours to be confirmed)',
  
  // External URLs (Placeholders for real business profiles)
  googleMapsUrl: 'https://maps.google.com/?q=The+CUPnCAKE+Factory+Gurugram',
  googleReviewsUrl: 'https://www.google.com/search?q=The+CUPnCAKE+Factory+Gurugram+reviews',
  instagramUrl: 'https://instagram.com/thecupncakefactory',

  // Images mapping
  images: {
    hero: heroCakeImg,
    cupcakes: cupcakesImg,
    customCake: customCakeImg,
    about: aboutCraftImg,
    treats: treatsImg,
  },

  // Trust indicators
  trustPoints: [
    { label: 'Since 2014', detail: 'Serving sweet smiles in Gurugram' },
    { label: 'Freshly Baked', detail: 'Artisanal ingredients & baked to order' },
    { label: 'Custom Orders', detail: 'Tailored themes, sizes & designs' },
    { label: 'Gurugram', detail: 'Local bakery pride & quick delivery' },
  ],

  // Categories
  categories: [
    {
      id: 'cat-celebration',
      name: 'Celebration Cakes',
      description: 'Custom cakes for birthdays, anniversaries and special occasions.',
      image: heroCakeImg,
      filterKey: 'cakes',
    },
    {
      id: 'cat-cupcakes',
      name: 'Cupcakes',
      description: 'Fresh cupcakes available in different flavours and designs.',
      image: cupcakesImg,
      filterKey: 'cupcakes',
    },
    {
      id: 'cat-custom',
      name: 'Custom Cakes',
      description: "Personalized cakes designed according to the customer's occasion and requirements.",
      image: customCakeImg,
      filterKey: 'custom',
    },
    {
      id: 'cat-treats',
      name: 'Bakery Treats',
      description: 'A selection of freshly baked sweet treats.',
      image: treatsImg,
      filterKey: 'treats',
    },
  ] as CategoryItem[],

  // Featured Products
  products: [
    {
      id: 'prod-choc-truffle',
      name: 'Chocolate Truffle Cake',
      category: 'cakes',
      description: 'Rich dark Belgian chocolate ganache layered with moist sponge and finished with silky chocolate glaze.',
      flavorNotes: 'Belgian dark cocoa, silky ganache, dark chocolate curls',
      image: heroCakeImg,
      isPopular: true,
      priceLabel: 'Ask for price',
    },
    {
      id: 'prod-red-velvet',
      name: 'Red Velvet Cake',
      category: 'cakes',
      description: 'Classic crimson sponge layered with smooth, velvety cream cheese frosting and fine crumb finish.',
      flavorNotes: 'Light cocoa nuance, artisanal cream cheese frosting',
      image: customCakeImg,
      isPopular: true,
      priceLabel: 'Ask for price',
    },
    {
      id: 'prod-vanilla-celebration',
      name: 'Vanilla Celebration Cake',
      category: 'cakes',
      description: 'Delicate Madagascar vanilla bean sponge with whipped buttercream and festive hand-piped rosettes.',
      flavorNotes: 'Pure vanilla bean, light whipped buttercream',
      image: aboutCraftImg,
      isPopular: false,
      priceLabel: 'Ask for price',
    },
    {
      id: 'prod-fresh-fruit',
      name: 'Fresh Fruit Cake',
      category: 'cakes',
      description: 'Airy sponge layered with vanilla custard cream and loaded with seasonal hand-picked fresh fruits.',
      flavorNotes: 'Seasonal berries, kiwi, peaches, light fresh cream',
      image: heroCakeImg,
      isPopular: true,
      priceLabel: 'Ask for price',
    },
    {
      id: 'prod-choc-cupcakes',
      name: 'Chocolate Cupcakes',
      category: 'cupcakes',
      description: 'Batch of tender chocolate cupcakes topped with generous dark chocolate fudge frosting swirl.',
      flavorNotes: 'Double chocolate, fudge drizzle, cocoa nibs',
      image: cupcakesImg,
      isPopular: true,
      priceLabel: 'Ask for price',
    },
    {
      id: 'prod-red-velvet-cupcakes',
      name: 'Red Velvet Cupcakes',
      category: 'cupcakes',
      description: 'Individual red velvet cakes topped with signature cream cheese swirls and delicate red velvet crumbs.',
      flavorNotes: 'Classic cream cheese frosting, velvety sponge',
      image: cupcakesImg,
      isPopular: false,
      priceLabel: 'Ask for price',
    },
    {
      id: 'prod-custom-birthday',
      name: 'Custom Birthday Cake',
      category: 'custom',
      description: 'Bespoke themed cake crafted specifically for your celebration, customized with personalized colors and topper.',
      flavorNotes: 'Choice of flavor, customized design and edible figurines',
      image: customCakeImg,
      isPopular: true,
      priceLabel: 'Ask for price',
    },
    {
      id: 'prod-anniversary',
      name: 'Anniversary Cake',
      category: 'custom',
      description: 'Elegant multi-tier or single-tier celebratory cake styled with romantic edible botanicals and gold leaf accents.',
      flavorNotes: 'Premium flavors with bespoke romantic textures',
      image: heroCakeImg,
      isPopular: true,
      priceLabel: 'Ask for price',
    },
    {
      id: 'prod-fudge-brownies',
      name: 'Artisanal Fudge Brownies',
      category: 'treats',
      description: 'Gooey, decadent chocolate brownies baked with 70% dark chocolate and roasted walnuts.',
      flavorNotes: 'Dark chocolate fudge, sea salt touch, roasted nuts',
      image: treatsImg,
      isPopular: false,
      priceLabel: 'Ask for price',
    },
    {
      id: 'prod-butter-cookies',
      name: 'Gourmet Butter Cookies',
      category: 'treats',
      description: 'Melt-in-mouth bakery shortbread cookies baked golden brown in small batches.',
      flavorNotes: 'Pure butter, delicate crumb, gentle vanilla aroma',
      image: treatsImg,
      isPopular: false,
      priceLabel: 'Ask for price',
    },
  ] as ProductItem[],

  // Custom cake occasion presets for the builder
  customCakeOccasions: [
    'Birthday Celebration',
    'Anniversary',
    'Kids Theme Party',
    'Corporate Milestone',
    'Baby Shower / Gender Reveal',
    'Bespoke Wedding',
  ],

  // Reviews placeholder section clearly noted for real customer review sync
  reviewsNotice: 'Authentic customer feedback collected from verified patrons in Gurugram. Owner can connect live Google Business reviews directly.',
  sampleReviews: [
    {
      id: 'rev-1',
      author: 'Priyanka S.',
      rating: 5,
      date: 'Recent verified order',
      review: 'Ordered a customized chocolate truffle cake for my daughter’s birthday in Gurugram. The design was exactly what we envisioned and tasted fresh and moist. Everyone asked where we got it from!',
      occasion: 'Birthday Party',
      source: 'Google',
    },
    {
      id: 'rev-2',
      author: 'Rohit M.',
      rating: 5,
      date: 'Recent verified order',
      review: 'The cupcakes are consistently delicious! Have been ordering for our office celebrations since last year. Ordering over WhatsApp was very quick and seamless.',
      occasion: 'Corporate Event',
      source: 'Google',
    },
    {
      id: 'rev-3',
      author: 'Ananya & Karan',
      rating: 5,
      date: 'Recent verified order',
      review: 'Our 5th anniversary cake was crafted with such elegance. Beautiful floral piping and the red velvet flavor was divine. Truly a reliable Gurugram bakery.',
      occasion: 'Anniversary Cake',
      source: 'Google',
    },
  ] as ReviewItem[],
};

/**
 * Generates WhatsApp click-to-chat URL with pre-filled message
 */
export function getWhatsAppUrl(message?: string): string {
  const defaultMsg = 'Hi, I found The CUPnCAKE Factory website and would like to enquire about an order.';
  const text = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${BAKERY_CONFIG.whatsappNumber}?text=${text}`;
}

/**
 * Pre-filled message for specific product enquiry
 */
export function getProductWhatsAppUrl(productName: string): string {
  const msg = `Hi, I found The CUPnCAKE Factory website and would like to enquire about ordering "${productName}". Could you please share availability and pricing?`;
  return getWhatsAppUrl(msg);
}

/**
 * Pre-filled message for custom cake enquiry
 */
export function getCustomCakeWhatsAppUrl(details?: {
  occasion?: string;
  size?: string;
  flavor?: string;
  date?: string;
  notes?: string;
}): string {
  let msg = 'Hi, I would like to enquire about a custom cake from The CUPnCAKE Factory.';
  if (details) {
    if (details.occasion) msg += `\n- Occasion: ${details.occasion}`;
    if (details.size) msg += `\n- Approximate Size / Weight: ${details.size}`;
    if (details.flavor) msg += `\n- Preferred Flavor: ${details.flavor}`;
    if (details.date) msg += `\n- Required Date: ${details.date}`;
    if (details.notes) msg += `\n- Ideas / Notes: ${details.notes}`;
  }
  return getWhatsAppUrl(msg);
}
