import SEO from '../components/SEO';
import { business } from '../lib/business';

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy"
        description={`Privacy information for ${business.name}'s website and enquiry form.`}
      />

      <section className="bg-gradient-to-br from-navy via-navy-light to-teal py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Privacy</h1>
          <p className="mt-3 text-base text-white/50">How we handle your information.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none text-charcoal/60 leading-relaxed space-y-6">
            <h2 className="text-lg font-semibold text-charcoal !mt-0">Information We Collect</h2>
            <p>
              When you submit an enquiry through our website, we collect the information you provide
              in the form, including your name, mobile number, email address (if provided), business
              name (if provided), service requirement, preferred contact method, and your message.
            </p>

            <h2 className="text-lg font-semibold text-charcoal">How We Use Your Information</h2>
            <p>
              The information you submit through the enquiry form is used solely to respond to your
              service enquiry and to provide the assistance you have requested. We do not sell, share,
              or distribute your personal information to third parties for marketing purposes.
            </p>

            <h2 className="text-lg font-semibold text-charcoal">Data Security</h2>
            <p>
              We take reasonable measures to protect the information you provide against unauthorised
              access, alteration, or destruction. However, please do not submit highly sensitive
              information such as passwords, OTPs, banking details, Aadhaar numbers, or PAN numbers
              through the enquiry form.
            </p>

            <h2 className="text-lg font-semibold text-charcoal">Cookies</h2>
            <p>
              This website may use essential cookies for its proper functioning. These cookies do not
              track your browsing activity across other websites.
            </p>

            <h2 className="text-lg font-semibold text-charcoal">Contact</h2>
            <p>
              If you have questions about how your information is handled, please contact us at{' '}
              <a href={`mailto:${business.email}`} className="text-teal hover:underline">
                {business.email}
              </a>{' '}
              or call us at{' '}
              <a href={`tel:+91${business.phone}`} className="text-teal hover:underline">
                {business.phone}
              </a>.
            </p>

            <p className="text-xs text-charcoal/30 pt-4 border-t border-border">
              This privacy notice was last updated on the date this website was published.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
