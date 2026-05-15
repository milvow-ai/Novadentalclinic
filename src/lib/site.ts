/**
 * Single source of truth for site-level metadata.
 * Used by SEO, schema, robots.txt, llms.txt, sitemap.
 */
export const SITE = {
  name: 'Nova Dental Studio',
  shortName: 'Nova Dental',
  url: 'https://novadentalstudio.com',
  defaultDescription:
    'Premium cosmetic and family dental care. Trusted by thousands of families for over 15 years — gentle, modern, evidence-based dentistry.',
  defaultOgImage: '/og-default.jpg',
  locale: 'en_US',
  themeColor: '#FAFAF7',
  contact: {
    phone: '+1-555-NOVA-DDS',
    email: 'hello@novadentalstudio.com',
    streetAddress: '128 Linden Avenue, Suite 200',
    addressLocality: 'Boston',
    addressRegion: 'MA',
    postalCode: '02116',
    addressCountry: 'US',
    geo: { latitude: 42.3505, longitude: -71.0743 },
    openingHours: [
      'Mo-Fr 08:00-18:00',
      'Sa 09:00-14:00',
    ],
  },
  social: {
    instagram: 'https://instagram.com/novadentalstudio',
    facebook: 'https://facebook.com/novadentalstudio',
  },
} as const;
