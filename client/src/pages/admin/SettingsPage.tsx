import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { getSettings, updateSettings } from '../../lib/api';

export default function SettingsPage() {
  const [form, setForm] = useState({
    business_name: '',
    professional_title: '',
    phone: '',
    email: '',
    address: '',
    tagline: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getSettings();
      if (data) {
        setForm({
          business_name: data.business_name || '',
          professional_title: data.professional_title || '',
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          tagline: data.tagline || '',
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load settings.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      await updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl space-y-5">
        <h1 className="text-xl font-semibold text-charcoal">Settings</h1>
        <div className="bg-white border border-border rounded-xl p-6 animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-offwhite rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-charcoal">Settings</h1>
        {saved && (
          <span className="text-xs text-success flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Settings saved
          </span>
        )}
      </div>

      {error && (
        <div className="flex gap-2 p-3 bg-danger-bg border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
          <p className="text-xs text-danger">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-border rounded-xl p-6 space-y-5">
        <div>
          <label htmlFor="business_name" className="block text-sm font-medium text-charcoal mb-1.5">
            Business Name
          </label>
          <input
            type="text"
            id="business_name"
            value={form.business_name}
            onChange={(e) => setForm((p) => ({ ...p, business_name: e.target.value }))}
            className="w-full px-4 py-2.5 text-sm border border-border rounded-lg outline-none focus:border-teal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="professional_title" className="block text-sm font-medium text-charcoal mb-1.5">
            Professional Title
          </label>
          <input
            type="text"
            id="professional_title"
            value={form.professional_title}
            onChange={(e) => setForm((p) => ({ ...p, professional_title: e.target.value }))}
            className="w-full px-4 py-2.5 text-sm border border-border rounded-lg outline-none focus:border-teal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1.5">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="w-full px-4 py-2.5 text-sm border border-border rounded-lg outline-none focus:border-teal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="settings_email" className="block text-sm font-medium text-charcoal mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="settings_email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="w-full px-4 py-2.5 text-sm border border-border rounded-lg outline-none focus:border-teal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-charcoal mb-1.5">
            Address
          </label>
          <textarea
            id="address"
            value={form.address}
            onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            rows={3}
            className="w-full px-4 py-2.5 text-sm border border-border rounded-lg outline-none focus:border-teal resize-y transition-colors"
          />
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-charcoal mb-1.5">
            Tagline
          </label>
          <input
            type="text"
            id="tagline"
            value={form.tagline}
            onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
            className="w-full px-4 py-2.5 text-sm border border-border rounded-lg outline-none focus:border-teal transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light disabled:opacity-60 transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
        </button>
      </form>
    </div>
  );
}
