import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { business, phoneUrl, emailUrl, whatsappUrl } from '../lib/business';
import { services, serviceCategories } from '../lib/services';

export default function Footer() {
  const year = new Date().getFullYear();
  
  // Show first 6 services in footer
  const footerServices = services.slice(0, 6);

  return (
    <footer className="bg-navy text-white/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block group">
              <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors">
                {business.name}
              </h3>
              <p className="text-xs text-gold/80 font-medium tracking-wide uppercase mt-0.5">
                {business.title}
              </p>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
              {business.tagline}. Providing accounting, GST, tax filing, and business registration support.
            </p>
            <div className="flex gap-2 mt-5">
              <a
                href={phoneUrl}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-green-600/20 text-white/60 hover:text-green-400 transition-colors"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={emailUrl}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/services', label: 'Services' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contact', label: 'Contact' },
                { to: '/privacy', label: 'Privacy' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 hover:text-gold transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-sm text-white/50 hover:text-gold transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gold/70 hover:text-gold transition-colors font-medium"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold/60 flex-shrink-0 mt-0.5" />
                <a
                  href={business.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-gold transition-colors leading-relaxed"
                >
                  {business.address.full}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <a href={phoneUrl} className="text-sm text-white/50 hover:text-gold transition-colors">
                  {business.phone}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <a href={emailUrl} className="text-sm text-white/50 hover:text-gold transition-colors break-all">
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {year} {business.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            {business.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
