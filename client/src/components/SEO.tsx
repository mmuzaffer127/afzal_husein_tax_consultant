import { useEffect } from 'react';
import { business } from '../lib/business';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  const fullTitle = title
    ? `${title} | ${business.name} — ${business.title}`
    : `${business.name} — ${business.title} | ${business.tagline}`;

  const metaDescription = description || 
    `${business.name} provides professional accounting, GST, tax filing, and business registration services in Bhatkal, Karnataka. Contact us for reliable financial assistance.`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) || 
               document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (name.startsWith('og:')) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', metaDescription);
    setMeta('og:title', fullTitle);
    setMeta('og:description', metaDescription);
    setMeta('og:type', 'website');

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [fullTitle, metaDescription, canonical]);

  return null;
}
