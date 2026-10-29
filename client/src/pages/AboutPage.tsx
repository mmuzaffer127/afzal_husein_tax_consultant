import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, MapPin, BookOpen, Shield, Users, Briefcase } from 'lucide-react';
import SEO from '../components/SEO';
import { business, phoneUrl, whatsappUrl } from '../lib/business';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About"
        description={`Learn about ${business.name}, ${business.title} in Bhatkal, Karnataka. Professional accounting, GST, tax, and business registration support.`}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-teal py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">About</span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {business.name}
            </h1>
            <p className="mt-2 text-sm text-gold/80 font-medium uppercase tracking-wider">
              {business.title}
            </p>
            <p className="mt-5 text-base text-white/50 leading-relaxed max-w-2xl">
              {business.tagline}. Providing professional accounting, tax, GST, and business 
              compliance assistance to individuals, shops, and businesses.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
                Professional Financial Support in Bhatkal
              </h2>
              <div className="mt-6 space-y-4 text-sm text-charcoal/60 leading-relaxed">
                <p>
                  {business.name} is an Accounts & Tax Professional based in Bhatkal, Karnataka, 
                  providing comprehensive accounting, taxation, and business compliance services. 
                  The practice serves individuals, shopkeepers, and businesses across a wide range 
                  of financial and regulatory needs.
                </p>
                <p>
                  With a focus on clear communication and reliable support, the practice assists 
                  clients with bookkeeping, income tax return filing, TDS compliance, GST 
                  registration and return filing, company and firm registration, FSSAI licensing, 
                  deed drafting, and other related services.
                </p>
                <p>
                  Located conveniently at {business.address.line1}, {business.address.line2}, 
                  {' '}{business.address.line3}, {business.address.city}, the office serves as a 
                  local resource for individuals and businesses seeking professional accounting 
                  and tax assistance.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: BookOpen,
                  title: 'Accounting & Tax Services',
                  desc: 'Bookkeeping, income tax filing, TDS, tax appeals, and Professional Tax registration.',
                },
                {
                  icon: Shield,
                  title: 'GST Compliance',
                  desc: 'GST registration, return filing, and refund assistance for businesses.',
                },
                {
                  icon: Briefcase,
                  title: 'Business Registrations',
                  desc: 'Company incorporation, partnership/LLP registration, firm registration, FSSAI licensing.',
                },
                {
                  icon: Users,
                  title: 'Serving Diverse Clients',
                  desc: 'Supporting individuals, self-employed professionals, shopkeepers, and businesses.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-offwhite border border-border rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-teal/10 text-teal">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal">{item.title}</h3>
                    <p className="mt-1 text-xs text-charcoal/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
              Our Approach
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: 'Clear Communication', desc: 'We believe in transparent, straightforward communication. Clients are kept informed throughout every process, with complex financial matters explained in simple terms.' },
              { title: 'Reliable Support', desc: 'Consistency and dependability form the foundation of our practice. Clients can count on timely, accurate assistance for their accounting and compliance needs.' },
              { title: 'Local Presence', desc: 'Being based in Bhatkal allows us to provide accessible, in-person service. We understand the local business environment and the needs of our community.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal/10 text-teal mx-auto mb-4">
                  <span className="text-lg font-bold">{i + 1}</span>
                </div>
                <h3 className="text-sm font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-xs text-charcoal/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-4 text-sm text-charcoal/50 leading-relaxed">
            Contact us to discuss your accounting, tax, or business registration needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={phoneUrl} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light transition-colors">
              <Phone className="w-4 h-4" /> Call Us
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-teal border border-teal/20 rounded-lg hover:bg-teal/5 transition-colors">
              Send Enquiry <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
