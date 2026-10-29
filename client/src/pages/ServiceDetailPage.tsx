import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, ChevronRight, FileText, CheckCircle, Users } from 'lucide-react';
import SEO from '../components/SEO';
import { getServiceBySlug, getRelatedServices, services } from '../lib/services';
import { business, phoneUrl, whatsappUrl } from '../lib/business';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const related = getRelatedServices(service.relatedServices);

  return (
    <>
      <SEO
        title={service.title}
        description={`${service.shortDescription} ${business.name} provides professional ${service.title.toLowerCase()} services in Bhatkal, Karnataka.`}
      />

      {/* Breadcrumb */}
      <div className="bg-offwhite border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-charcoal/40" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-teal transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/services" className="hover:text-teal transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-charcoal/70 font-medium">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Service Detail */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/5 border border-teal/10 rounded-full mb-5">
                <span className="text-xs font-medium text-teal capitalize">
                  {service.category.replace('-', ' & ')}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
                {service.title}
              </h1>

              <p className="mt-5 text-sm sm:text-base text-charcoal/60 leading-relaxed">
                {service.description}
              </p>

              {/* Who It's For */}
              {service.whoItsFor.length > 0 && (
                <div className="mt-10">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-charcoal mb-4">
                    <Users className="w-5 h-5 text-teal" />
                    Who May Need This Service
                  </h2>
                  <ul className="space-y-2.5">
                    {service.whoItsFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-charcoal/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process */}
              {service.process.length > 0 && (
                <div className="mt-10">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-charcoal mb-4">
                    <FileText className="w-5 h-5 text-teal" />
                    How We Assist
                  </h2>
                  <div className="space-y-4">
                    {service.process.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-teal/10 text-teal text-xs font-bold">
                          {i + 1}
                        </div>
                        <p className="text-sm text-charcoal/60 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Important Note */}
              <div className="mt-10 p-5 bg-offwhite border border-border rounded-xl">
                <p className="text-xs text-charcoal/50 leading-relaxed">
                  <strong className="text-charcoal/70">Note:</strong> The information provided on this 
                  page is for general guidance only and should not be considered as personalised 
                  legal or tax advice. Specific requirements may vary based on individual 
                  circumstances. Please contact us for a detailed discussion of your needs.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-navy to-teal rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold">Need {service.title} Assistance?</h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">
                  Contact us to discuss your requirements. We provide professional support 
                  tailored to your needs.
                </p>
                <div className="mt-5 space-y-2.5">
                  <a
                    href={phoneUrl}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Send Enquiry
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Related Services */}
              {related.length > 0 && (
                <div className="bg-white border border-border rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-charcoal mb-4">Related Services</h3>
                  <div className="space-y-2">
                    {related.map((rs) => (
                      <Link
                        key={rs.slug}
                        to={`/services/${rs.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-offwhite transition-colors group"
                      >
                        <span className="text-sm text-charcoal/60 group-hover:text-teal transition-colors">
                          {rs.title}
                        </span>
                        <ChevronRight className="w-4 h-4 text-charcoal/20 group-hover:text-teal transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
