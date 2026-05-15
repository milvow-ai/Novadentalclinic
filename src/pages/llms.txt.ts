import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';

/**
 * /llms.txt — machine-readable site summary for LLM agents.
 * Follows the llms.txt convention (https://llmstxt.org).
 */
export const GET: APIRoute = () => {
  const body = `# ${SITE.name}

> ${SITE.defaultDescription}

${SITE.name} is a premium cosmetic and family dental clinic. We offer evidence-based, gentle dentistry with a focus on long-term patient relationships.

## Services
- General Dentistry — routine exams, cleanings, fillings, preventive care
- Cosmetic Dentistry — veneers, smile makeovers, bonding
- Teeth Whitening — in-office and take-home professional whitening
- Dental Implants — single-tooth, multiple-tooth, and full-arch solutions
- Dental Sealants — protective coatings for cavity prevention
- Root Canal Therapy — endodontic treatment with modern techniques

## Visit
- Address: ${SITE.contact.streetAddress}, ${SITE.contact.addressLocality}, ${SITE.contact.addressRegion} ${SITE.contact.postalCode}
- Phone: ${SITE.contact.phone}
- Email: ${SITE.contact.email}
- Hours: ${SITE.contact.openingHours.join(' · ')}

## Book online
- Online booking: ${SITE.url}/#booking

## Links
- Sitemap: ${SITE.url}/sitemap-index.xml
- Homepage: ${SITE.url}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
