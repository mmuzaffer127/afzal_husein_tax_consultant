// ============================================
// Business Configuration — Single Source of Truth
// ============================================

export const business = {
  name: 'Afzal Husein Mohtesham',
  title: 'Accounts & Tax Professional',
  phone: '8123033231',
  phoneIntl: '+918123033231',
  email: 'afzalmohtesham0@gmail.com',
  tagline: 'Serving Bhatkal with Trust Since 2022',
  address: {
    line1: '#Square',
    line2: 'Ameenuddin Road',
    line3: 'Nawayath Colony',
    city: 'Bhatkal',
    pin: '581 320',
    state: 'Karnataka',
    country: 'India',
    full: '#Square, Ameenuddin Road, Nawayath Colony, Bhatkal – 581 320, Karnataka, India',
  },
  whatsappMessage: 'Hello, I would like to enquire about your accounting and tax services.',
  directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    '#Square, Ameenuddin Road, Nawayath Colony, Bhatkal 581320, Karnataka, India'
  )}`,
};

export const whatsappUrl = `https://wa.me/${business.phoneIntl.replace('+', '')}?text=${encodeURIComponent(
  business.whatsappMessage
)}`;

export const phoneUrl = `tel:${business.phoneIntl}`;
export const emailUrl = `mailto:${business.email}`;
