import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import SEO from '../components/SEO';
import { services, serviceCategories, getServicesByCategory } from '../lib/services';
import { business } from '../lib/business';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Services"
        description={`Explore accounting, GST, tax filing, and business registration services offered by ${business.name} in Bhatkal, Karnataka.`}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-teal py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">Our Services</span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Professional Services
            </h1>
            <p className="mt-5 text-base text-white/50 leading-relaxed max-w-2xl">
              Comprehensive accounting, tax, GST, and business registration services 
              tailored to your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {serviceCategories.map((category) => {
            const categoryServices = getServicesByCategory(category.id);
            if (categoryServices.length === 0) return null;

            return (
              <div key={category.id} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-7 bg-gold rounded-full" />
                  <h2 className="text-xl sm:text-2xl font-bold text-charcoal">{category.label}</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="group p-6 bg-white border border-border rounded-xl hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5 transition-all duration-300"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal/8 text-teal group-hover:bg-teal group-hover:text-white transition-all duration-300">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-charcoal group-hover:text-teal transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-charcoal/50 leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Other Services */}
          <div className="mt-12 p-6 sm:p-8 bg-offwhite border border-border rounded-xl text-center">
            <h3 className="text-lg font-semibold text-charcoal">
              Other Related Accounting, Tax & Business Compliance Services
            </h3>
            <p className="mt-2 text-sm text-charcoal/50 max-w-lg mx-auto leading-relaxed">
              Need help with a service not listed above? Contact us to discuss your 
              specific requirement. We provide a range of additional accounting, tax, and 
              business compliance services.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light transition-colors"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
