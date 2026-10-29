import { Link } from 'react-router-dom';
import {
  ArrowRight, Phone, MessageCircle, MapPin, Shield, Users, Briefcase,
  FileText, CheckCircle, BookOpen, ShieldCheck, Building2, ClipboardList,
  MessageSquare, ChevronDown, ChevronRight, Headphones
} from 'lucide-react';
import SEO from '../components/SEO';
import { business, phoneUrl, whatsappUrl } from '../lib/business';
import { services, serviceCategories } from '../lib/services';
import { faqs } from '../lib/faqs';
import { useState } from 'react';

const iconMap: Record<string, any> = {
  BookOpen, FileText, ShieldCheck, Building2, Users, Briefcase,
};

export default function HomePage() {
  return (
    <>
      <SEO />
      <HeroSection />
      <TrustStrip />
      <ServicesPreview />
      <WhyChooseUs />
      <HowItWorks />
      <ConsultationCTA />
      <FAQPreview />
      <ContactPreview />
    </>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-navy via-navy-light to-teal overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full mb-6">
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
            <span className="text-xs sm:text-sm font-medium text-gold/90 tracking-wide">
              {business.tagline}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-white leading-tight tracking-tight">
            Reliable Accounting & Tax Support for Individuals and Businesses
          </h1>

          {/* Supporting copy */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
            {business.name} provides accounting, GST, tax filing, registration, and business 
            compliance support in Bhatkal. Professional assistance for your financial and 
            regulatory needs.
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-gold text-navy rounded-lg hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
            >
              Get Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-200"
            >
              Explore Services
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={phoneUrl}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-lg hover:bg-green-600/20 hover:text-green-300 hover:border-green-500/20 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a
              href={business.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all"
            >
              <MapPin className="w-3.5 h-3.5" />
              Directions
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

/* ─── Trust Strip ─── */
function TrustStrip() {
  const items = [
    { icon: Shield, label: 'Professional Support', desc: 'Qualified assistance for your needs' },
    { icon: MessageSquare, label: 'Clear Communication', desc: 'Transparent and responsive service' },
    { icon: MapPin, label: 'Local Assistance', desc: 'Conveniently located in Bhatkal' },
    { icon: Briefcase, label: 'Multiple Services', desc: 'Accounting, tax, GST & registrations' },
  ];

  return (
    <section className="py-14 sm:py-16 bg-offwhite border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3.5 group">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white transition-all duration-300">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal">{item.label}</h3>
                <p className="text-xs text-charcoal/50 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services Preview ─── */
function ServicesPreview() {
  const featured = services.slice(0, 8);
  
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-14">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">Our Services</span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            Comprehensive Financial & Business Support
          </h2>
          <p className="mt-4 text-sm sm:text-base text-charcoal/50 max-w-2xl mx-auto leading-relaxed">
            From bookkeeping and tax filing to GST compliance and business registration — 
            professional assistance for all your accounting and regulatory needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {featured.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group p-5 bg-white border border-border rounded-xl hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5 transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal/8 text-teal group-hover:bg-teal group-hover:text-white transition-all duration-300">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-charcoal group-hover:text-teal transition-colors">
                {service.title}
              </h3>
              <p className="mt-2 text-xs text-charcoal/50 leading-relaxed line-clamp-2">
                {service.shortDescription}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-teal opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <ChevronRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-teal border border-teal/20 rounded-lg hover:bg-teal/5 transition-colors"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─── */
function WhyChooseUs() {
  const reasons = [
    { icon: Headphones, title: 'Personalised Assistance', desc: 'Individual attention to understand your specific situation and provide relevant support.' },
    { icon: MapPin, title: 'Convenient Local Support', desc: 'Located in Bhatkal for easy access. In-person consultations available at our office.' },
    { icon: Briefcase, title: 'Multiple Services Under One Roof', desc: 'From bookkeeping to company registration — handle all your compliance needs in one place.' },
    { icon: ClipboardList, title: 'Clear Process', desc: 'Structured approach from initial consultation to completion, keeping you informed throughout.' },
    { icon: MessageSquare, title: 'Responsive Communication', desc: 'Reach us through phone, WhatsApp, or email. We aim to respond promptly to your queries.' },
    { icon: Shield, title: 'Reliable Support', desc: 'Consistent, trustworthy assistance you can depend on for your financial and regulatory needs.' },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-14">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">Why Choose Us</span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            Professional Support You Can Trust
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-teal/10 text-teal">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-1.5 text-xs text-charcoal/50 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    { number: '01', title: 'Contact Us', desc: 'Reach out through phone, WhatsApp, email, or the enquiry form on this website.' },
    { number: '02', title: 'Discuss Your Requirement', desc: 'We will understand your needs and explain how we can assist you.' },
    { number: '03', title: 'Submit Documents Securely', desc: 'Share required documents through appropriate secure channels as guided.' },
    { number: '04', title: 'Receive Professional Assistance', desc: 'We handle the process and keep you informed at every stage.' },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-14">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">How It Works</span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            Simple Steps to Get Started
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              <div className="text-4xl font-bold text-teal/10 group-hover:text-teal/20 transition-colors">
                {step.number}
              </div>
              <h3 className="mt-2 text-sm font-semibold text-charcoal">{step.title}</h3>
              <p className="mt-2 text-xs text-charcoal/50 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-5 -right-4 text-border">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Consultation CTA ─── */
function ConsultationCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-navy via-navy-light to-teal rounded-2xl overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
          
          <div className="relative max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Ready to discuss your requirements?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/50 leading-relaxed">
              Contact us to discuss your accounting, tax, or business registration needs. 
              We are here to help.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={phoneUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                Send Enquiry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ Preview ─── */
function FAQPreview() {
  const previewFaqs = faqs.slice(0, 4);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-offwhite">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">FAQ</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {previewFaqs.map((faq, i) => (
            <div key={i} className="bg-white border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-charcoal hover:text-teal transition-colors"
                aria-expanded={openIndex === i}
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 ml-3 transition-transform duration-200 ${
                  openIndex === i ? 'rotate-180' : ''
                }`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${
                openIndex === i ? 'max-h-40' : 'max-h-0'
              }`}>
                <p className="px-5 pb-4 text-sm text-charcoal/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-teal border border-teal/20 rounded-lg hover:bg-teal/5 transition-colors"
          >
            View All FAQs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Preview ─── */
function ContactPreview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">Get In Touch</span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
              Visit Our Office
            </h2>
            <p className="mt-4 text-sm text-charcoal/50 leading-relaxed">
              We are conveniently located in Bhatkal. Visit us for a consultation or reach out 
              through any of the contact methods below.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-teal/10 text-teal flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">Office Address</p>
                  <p className="text-xs text-charcoal/50 mt-0.5 leading-relaxed">{business.address.full}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-teal/10 text-teal flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">Phone</p>
                  <a href={phoneUrl} className="text-xs text-teal hover:underline">{business.phone}</a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={phoneUrl} className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-teal rounded-lg hover:bg-teal-light transition-colors">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-charcoal/60 border border-border rounded-lg hover:bg-offwhite transition-colors">
                <MapPin className="w-3.5 h-3.5" /> Directions
              </a>
            </div>
          </div>

          <div className="bg-offwhite rounded-2xl p-6 sm:p-8 border border-border">
            <h3 className="text-lg font-semibold text-charcoal mb-1">{business.name}</h3>
            <p className="text-xs text-teal font-medium uppercase tracking-wide mb-4">{business.title}</p>
            <div className="space-y-3 text-sm text-charcoal/60">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold/60 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{business.address.full}</span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <a href={phoneUrl} className="hover:text-teal transition-colors">{business.phone}</a>
              </div>
              <div className="flex gap-3 items-center">
                <MessageCircle className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <a href={`mailto:${business.email}`} className="hover:text-teal transition-colors break-all">{business.email}</a>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-xs text-charcoal/40 italic">{business.tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
