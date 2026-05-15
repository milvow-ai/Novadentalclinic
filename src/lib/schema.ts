/**
 * schema.org JSON-LD helpers. Each returns a plain object suitable
 * for embedding via <script type="application/ld+json">.
 *
 * Helpers provided: localBusiness, service, faqPage, breadcrumbList.
 */
import { SITE } from './site';

type Json = Record<string, unknown>;

export function localBusiness(overrides: Json = {}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.defaultDescription,
    image: new URL(SITE.defaultOgImage, SITE.url).toString(),
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.contact.streetAddress,
      addressLocality: SITE.contact.addressLocality,
      addressRegion: SITE.contact.addressRegion,
      postalCode: SITE.contact.postalCode,
      addressCountry: SITE.contact.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.contact.geo.latitude,
      longitude: SITE.contact.geo.longitude,
    },
    openingHoursSpecification: SITE.contact.openingHours.map((h) => {
      const [days, hours] = h.split(' ');
      const [opens, closes] = hours.split('-');
      const dayMap: Record<string, string> = {
        Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday',
        Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday',
      };
      const range = days.split('-').map((d) => dayMap[d]).filter(Boolean);
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: range,
        opens,
        closes,
      };
    }),
    sameAs: Object.values(SITE.social),
    priceRange: '$$',
    ...overrides,
  };
}

export function service(opts: {
  name: string;
  description: string;
  url?: string;
  image?: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    provider: { '@id': `${SITE.url}/#business` },
    areaServed: { '@type': 'City', name: SITE.contact.addressLocality },
    url: opts.url ? new URL(opts.url, SITE.url).toString() : undefined,
    image: opts.image ? new URL(opts.image, SITE.url).toString() : undefined,
  };
}

export function faqPage(qa: Array<{ q: string; a: string }>): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}

export function breadcrumbList(items: Array<{ name: string; url: string }>): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.url, SITE.url).toString(),
    })),
  };
}

export function website(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.defaultDescription,
    inLanguage: 'en-US',
  };
}
