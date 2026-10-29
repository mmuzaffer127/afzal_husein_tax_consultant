import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Phone, MessageCircle, Mail, Save, Loader2, AlertCircle,
  User, Briefcase, FileText, Clock, CheckCircle
} from 'lucide-react';
import { getEnquiryById, updateEnquiryStatus, updateEnquiryNotes } from '../../lib/api';

const allStatuses = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'] as const;

const statusColor: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-yellow-100 text-yellow-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  COMPLETED: 'bg-green-100 text-green-700',
  ARCHIVED: 'bg-gray-100 text-gray-500',
};

const statusLabel: Record<string, string> = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
};

export default function EnquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    loadEnquiry();
  }, [id]);

  async function loadEnquiry() {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getEnquiryById(id);
      setEnquiry(data);
      setNotes(data.internal_notes || '');
    } catch (err: any) {
      setError(err.message || 'Failed to load enquiry.');
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(newStatus: string) {
    if (!id || savingStatus) return;
    setSavingStatus(true);
    try {
      const updated = await updateEnquiryStatus(id, newStatus);
      setEnquiry((prev: any) => ({ ...prev, ...(updated as any), status: newStatus }));
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
    } finally {
      setSavingStatus(false);
    }
  }

  async function handleSaveNotes() {
    if (!id || savingNotes) return;
    setSavingNotes(true);
    setNotesSaved(false);
    try {
      await updateEnquiryNotes(id, notes);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save notes.');
    } finally {
      setSavingNotes(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-6 w-32 bg-offwhite rounded animate-pulse" />
        <div className="bg-white border border-border rounded-xl p-6 space-y-4 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-offwhite rounded w-3/4" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !enquiry) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-10 h-10 text-danger mx-auto mb-3" />
        <p className="text-sm text-charcoal/60">{error || 'Enquiry not found.'}</p>
        <Link to="/admin/enquiries" className="mt-3 inline-block text-sm text-teal hover:underline">
          Back to Enquiries
        </Link>
      </div>
    );
  }

  const phoneUrl = `tel:+91${enquiry.mobile}`;
  const whatsappUrl = `https://wa.me/91${enquiry.mobile}?text=${encodeURIComponent('Hello, this is regarding your enquiry.')}`;
  const emailUrl = enquiry.email ? `mailto:${enquiry.email}` : null;

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Back */}
      <Link
        to="/admin/enquiries"
        className="inline-flex items-center gap-1.5 text-sm text-charcoal/40 hover:text-teal transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Enquiries
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-charcoal">{enquiry.full_name}</h1>
          <p className="text-xs text-charcoal/40 mt-0.5">
            Submitted {new Date(enquiry.created_at).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
            })}
          </p>
        </div>
        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full self-start ${statusColor[enquiry.status] || ''}`}>
          {statusLabel[enquiry.status] || enquiry.status}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Contact Details */}
          <div className="bg-white border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-charcoal mb-4">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoRow icon={User} label="Full Name" value={enquiry.full_name} />
              <InfoRow icon={Phone} label="Mobile" value={enquiry.mobile} />
              {enquiry.email && <InfoRow icon={Mail} label="Email" value={enquiry.email} />}
              {enquiry.business_name && <InfoRow icon={Briefcase} label="Business / Shop" value={enquiry.business_name} />}
              <InfoRow icon={FileText} label="Service Required" value={enquiry.service_required} />
              <InfoRow icon={MessageCircle} label="Preferred Contact" value={enquiry.preferred_contact_method} />
            </div>
          </div>

          {/* Message */}
          <div className="bg-white border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-charcoal mb-3">Message</h2>
            <p className="text-sm text-charcoal/60 leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
          </div>

          {/* Internal Notes */}
          <div className="bg-white border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-charcoal">Internal Notes</h2>
              {notesSaved && (
                <span className="text-xs text-success flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Saved
                </span>
              )}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              maxLength={10000}
              className="w-full px-3 py-2.5 text-sm border border-border rounded-lg outline-none focus:border-teal resize-y"
              placeholder="Add internal notes about this enquiry..."
            />
            <button
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light disabled:opacity-60 transition-colors"
            >
              {savingNotes ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Notes
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Actions */}
          <div className="bg-white border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-charcoal mb-3">Actions</h2>
            <div className="space-y-2">
              <a
                href={phoneUrl}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-teal border border-teal/20 rounded-lg hover:bg-teal/5 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call {enquiry.full_name.split(' ')[0]}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              {emailUrl && (
                <a
                  href={emailUrl}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-charcoal/60 border border-border rounded-lg hover:bg-offwhite transition-colors"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
              )}
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-white border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-charcoal mb-3">Update Status</h2>
            <div className="space-y-1.5">
              {allStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  disabled={enquiry.status === s || savingStatus}
                  className={`w-full text-left px-3.5 py-2 text-sm rounded-lg transition-colors ${
                    enquiry.status === s
                      ? 'bg-teal/10 text-teal font-medium cursor-default'
                      : 'text-charcoal/50 hover:bg-offwhite hover:text-charcoal'
                  } disabled:cursor-not-allowed`}
                >
                  {statusLabel[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-charcoal mb-3">Details</h2>
            <div className="space-y-2 text-xs text-charcoal/40">
              <div className="flex justify-between">
                <span>ID</span>
                <span className="text-charcoal/60 font-mono text-[10px]">{enquiry.id.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span>Created</span>
                <span>{new Date(enquiry.created_at).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Updated</span>
                <span>{new Date(enquiry.updated_at).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-charcoal/20 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-[10px] text-charcoal/30 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-charcoal/70 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
