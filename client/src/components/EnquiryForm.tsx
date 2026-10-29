import { useState } from 'react';
import { Send, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { getServiceTitles } from '../lib/services';
import { submitEnquiry } from '../lib/api';

const serviceOptions = getServiceTitles();

const initialForm = {
  full_name: '',
  mobile: '',
  email: '',
  business_name: '',
  service_required: '',
  preferred_contact_method: '' as '' | 'Phone' | 'WhatsApp' | 'Email',
  message: '',
  consent: false,
  honeypot: '',
};

export default function EnquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.full_name.trim() || form.full_name.trim().length < 2) {
      errs.full_name = 'Please enter your full name (at least 2 characters)';
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      errs.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.service_required) {
      errs.service_required = 'Please select a service';
    }
    if (!form.preferred_contact_method) {
      errs.preferred_contact_method = 'Please select how you prefer to be contacted';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Please describe your requirement (at least 10 characters)';
    }
    if (!form.consent) {
      errs.consent = 'Please provide your consent to proceed';
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');
    setServerError('');

    try {
      await submitEnquiry({
        full_name: form.full_name.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim() || undefined,
        business_name: form.business_name.trim() || undefined,
        service_required: form.service_required,
        preferred_contact_method: form.preferred_contact_method,
        message: form.message.trim(),
        consent: form.consent,
        honeypot: form.honeypot,
      });
      setStatus('success');
      setForm(initialForm);
    } catch (err: any) {
      setStatus('error');
      setServerError(err.message || 'Unable to submit your enquiry. Please try again or contact us directly.');
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-success-bg border border-green-200 rounded-xl p-8 text-center">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-charcoal mb-2">Enquiry Received</h3>
        <p className="text-sm text-charcoal/70 max-w-md mx-auto">
          Thank you. Your enquiry has been received. We will contact you regarding your request.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 px-5 py-2 text-sm font-medium text-teal border border-teal/20 rounded-lg hover:bg-teal/5 transition-colors"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot - invisible to humans */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="honeypot">Leave empty</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={form.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-charcoal mb-1.5">
          Full Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          maxLength={150}
          className={`w-full px-4 py-2.5 text-sm border rounded-lg bg-white outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal/20 ${
            errors.full_name ? 'border-danger' : 'border-border'
          }`}
          placeholder="Enter your full name"
        />
        {errors.full_name && <p className="text-xs text-danger mt-1">{errors.full_name}</p>}
      </div>

      {/* Mobile */}
      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-charcoal mb-1.5">
          Mobile Number <span className="text-danger">*</span>
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          maxLength={10}
          className={`w-full px-4 py-2.5 text-sm border rounded-lg bg-white outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal/20 ${
            errors.mobile ? 'border-danger' : 'border-border'
          }`}
          placeholder="10-digit mobile number"
        />
        {errors.mobile && <p className="text-xs text-danger mt-1">{errors.mobile}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
          Email <span className="text-charcoal/40">(Optional)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          maxLength={255}
          className={`w-full px-4 py-2.5 text-sm border rounded-lg bg-white outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal/20 ${
            errors.email ? 'border-danger' : 'border-border'
          }`}
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
      </div>

      {/* Business Name */}
      <div>
        <label htmlFor="business_name" className="block text-sm font-medium text-charcoal mb-1.5">
          Business / Shop Name <span className="text-charcoal/40">(Optional)</span>
        </label>
        <input
          type="text"
          id="business_name"
          name="business_name"
          value={form.business_name}
          onChange={handleChange}
          maxLength={255}
          className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-white outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal/20"
          placeholder="Your business or shop name"
        />
      </div>

      {/* Service Required */}
      <div>
        <label htmlFor="service_required" className="block text-sm font-medium text-charcoal mb-1.5">
          Service Required <span className="text-danger">*</span>
        </label>
        <select
          id="service_required"
          name="service_required"
          value={form.service_required}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 text-sm border rounded-lg bg-white outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal/20 ${
            errors.service_required ? 'border-danger' : 'border-border'
          } ${!form.service_required ? 'text-charcoal/40' : ''}`}
        >
          <option value="">Select a service</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service_required && <p className="text-xs text-danger mt-1">{errors.service_required}</p>}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">
          Preferred Contact Method <span className="text-danger">*</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {(['Phone', 'WhatsApp', 'Email'] as const).map((method) => (
            <label
              key={method}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg cursor-pointer text-sm transition-all ${
                form.preferred_contact_method === method
                  ? 'border-teal bg-teal/5 text-teal font-medium'
                  : 'border-border text-charcoal/60 hover:border-teal/30'
              }`}
            >
              <input
                type="radio"
                name="preferred_contact_method"
                value={method}
                checked={form.preferred_contact_method === method}
                onChange={handleChange}
                className="sr-only"
              />
              {method}
            </label>
          ))}
        </div>
        {errors.preferred_contact_method && (
          <p className="text-xs text-danger mt-1">{errors.preferred_contact_method}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1.5">
          Message <span className="text-danger">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          maxLength={5000}
          className={`w-full px-4 py-2.5 text-sm border rounded-lg bg-white outline-none transition-colors resize-y focus:border-teal focus:ring-1 focus:ring-teal/20 ${
            errors.message ? 'border-danger' : 'border-border'
          }`}
          placeholder="Describe your requirement..."
        />
        {errors.message && <p className="text-xs text-danger mt-1">{errors.message}</p>}
      </div>

      {/* Security Notice */}
      <div className="flex gap-2.5 p-3.5 bg-warning-bg border border-yellow-200 rounded-lg">
        <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
        <p className="text-xs text-charcoal/70 leading-relaxed">
          Please do not enter passwords, OTPs, banking information, Aadhaar/PAN numbers, or other
          highly sensitive credentials in this form.
        </p>
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 border-border text-teal rounded focus:ring-teal/20"
          />
          <span className="text-xs text-charcoal/60 leading-relaxed">
            I consent to the submission of my details for the purpose of receiving a response to
            my enquiry. My information will be used solely to address my service request.
          </span>
        </label>
        {errors.consent && <p className="text-xs text-danger mt-1">{errors.consent}</p>}
      </div>

      {/* Server Error */}
      {status === 'error' && (
        <div className="flex gap-2.5 p-3.5 bg-danger-bg border border-red-200 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
          <p className="text-xs text-danger leading-relaxed">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-teal hover:bg-teal-light rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Enquiry
          </>
        )}
      </button>
    </form>
  );
}
