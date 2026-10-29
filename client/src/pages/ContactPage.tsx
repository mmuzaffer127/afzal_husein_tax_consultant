import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import EnquiryForm from '../components/EnquiryForm';
import { business, phoneUrl, emailUrl, whatsappUrl } from '../lib/business';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description={`Contact ${business.name}, ${business.title} in Bhatkal, Karnataka. Call, WhatsApp, email, or submit an enquiry.`}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-teal py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">Contact</span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Get In Touch
            </h1>
            <p className="mt-5 text-base text-white/50 leading-relaxed">
              We are here to assist you. Reach out through any of the methods below, or submit 
              an enquiry and we will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {/* Business Card */}
              <div>
                <h2 className="text-xl font-semibold text-charcoal">{business.name}</h2>
                <p className="text-sm text-teal font-medium mt-0.5">{business.title}</p>
              </div>

              {/* Contact Details */}
              <div className="space-y-5">
                <div className="flex gap-3.5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal/10 text-teal flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Office Address</p>
                    <p className="text-sm text-charcoal/50 mt-0.5 leading-relaxed">
                      {business.address.line1}<br />
                      {business.address.line2}<br />
                      {business.address.line3}<br />
                      {business.address.city} – {business.address.pin}<br />
                      {business.address.state}, {business.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal/10 text-teal flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Phone</p>
                    <a href={phoneUrl} className="text-sm text-teal hover:underline">
                      {business.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal/10 text-teal flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Email</p>
                    <a href={emailUrl} className="text-sm text-teal hover:underline break-all">
                      {business.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={phoneUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={emailUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-charcoal/60 border border-border rounded-lg hover:bg-offwhite transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <a
                  href={business.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-charcoal/60 border border-border rounded-lg hover:bg-offwhite transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Directions
                </a>
              </div>

              {/* Tagline */}
              <div className="pt-6 border-t border-border">
                <p className="text-xs text-charcoal/30 italic">{business.tagline}</p>
              </div>
            </div>

            {/* Enquiry Form - Right Side */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-border rounded-xl p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-charcoal mb-1">Submit an Enquiry</h2>
                <p className="text-sm text-charcoal/50 mb-6">
                  Fill in the form below and we will get back to you regarding your requirement.
                </p>
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
