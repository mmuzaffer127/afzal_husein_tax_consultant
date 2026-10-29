import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { business, phoneUrl, whatsappUrl } from '../lib/business';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-border'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-tight group" aria-label="Home">
            <span className="text-[15px] sm:text-base lg:text-lg font-semibold text-navy tracking-tight group-hover:text-teal transition-colors">
              {business.name}
            </span>
            <span className="text-[10px] sm:text-xs text-teal font-medium tracking-wide uppercase">
              {business.title}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || 
                (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-teal bg-teal/5'
                      : 'text-charcoal/70 hover:text-teal hover:bg-teal/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={phoneUrl}
              className="p-2 text-charcoal/60 hover:text-teal rounded-lg hover:bg-teal/5 transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-[18px] h-[18px]" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-charcoal/60 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-[18px] h-[18px]" />
            </a>
            <Link
              to="/contact"
              className="ml-1 px-5 py-2 text-sm font-medium text-white bg-teal hover:bg-teal-light rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Get Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-charcoal/70 hover:text-teal rounded-lg hover:bg-teal/5 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-border shadow-lg transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to ||
              (link.to !== '/' && location.pathname.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-teal bg-teal/5'
                    : 'text-charcoal/70 hover:text-teal hover:bg-teal/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-border mt-3 flex gap-2">
            <a
              href={phoneUrl}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-teal border border-teal/20 rounded-lg hover:bg-teal/5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
          <Link
            to="/contact"
            className="block text-center px-4 py-3 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light transition-colors"
          >
            Get Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
