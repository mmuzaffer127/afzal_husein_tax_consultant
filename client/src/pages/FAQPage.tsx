import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { faqs, faqCategories } from '../lib/faqs';
import { business, phoneUrl, whatsappUrl } from '../lib/business';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    let result = faqs;
    if (activeCategory !== 'all') {
      result = result.filter((f) => f.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <>
      <SEO
        title="FAQ"
        description={`Frequently asked questions about accounting, GST, tax filing, and business registration services by ${business.name} in Bhatkal.`}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-teal py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">FAQ</span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-5 text-base text-white/50 leading-relaxed">
              Find answers to common questions about our services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-xl bg-white outline-none focus:border-teal focus:ring-1 focus:ring-teal/20 transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-teal text-white border-teal'
                    : 'bg-white text-charcoal/50 border-border hover:border-teal/30 hover:text-teal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <div key={i} className="bg-white border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-charcoal hover:text-teal transition-colors"
                    aria-expanded={openIndex === i}
                  >
                    <span className="pr-3">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${
                    openIndex === i ? 'max-h-60' : 'max-h-0'
                  }`}>
                    <p className="px-5 pb-4 text-sm text-charcoal/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-charcoal/40">No questions match your search.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-6 sm:p-8 bg-offwhite border border-border rounded-xl text-center">
            <h3 className="text-lg font-semibold text-charcoal">Still have questions?</h3>
            <p className="mt-2 text-sm text-charcoal/50">
              Contact us directly and we will be happy to help.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light transition-colors"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
