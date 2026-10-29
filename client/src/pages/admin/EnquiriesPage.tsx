import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Inbox, AlertCircle, ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { getEnquiries } from '../../lib/api';
import { getServiceTitles } from '../../lib/services';

const statuses = ['', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'];
const statusLabels: Record<string, string> = {
  '': 'All Statuses',
  NEW: 'New',
  CONTACTED: 'Contacted',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
};

const statusColor: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-yellow-100 text-yellow-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  COMPLETED: 'bg-green-100 text-green-700',
  ARCHIVED: 'bg-gray-100 text-gray-500',
};

const serviceOptions = getServiceTitles();

export default function EnquiriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const page = parseInt(searchParams.get('page') || '1', 10);
  const status = searchParams.get('status') || '';
  const service = searchParams.get('service') || '';
  const search = searchParams.get('search') || '';
  const sort = (searchParams.get('sort') || 'newest') as 'newest' | 'oldest';

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getEnquiries({
        page,
        limit: 20,
        status: status || undefined,
        service: service || undefined,
        search: search || undefined,
        sort,
      });
      setEnquiries(data.items);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError(err.message || 'Failed to load enquiries.');
    } finally {
      setLoading(false);
    }
  }, [page, status, service, search, sort]);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') params.set('page', '1');
    setSearchParams(params);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-charcoal">Enquiries</h1>
        <span className="text-xs text-charcoal/40">{total} total</span>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
            <input
              type="text"
              placeholder="Search name, phone, email..."
              value={search}
              onChange={(e) => updateParam('search', e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg outline-none focus:border-teal transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => updateParam('status', e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg outline-none focus:border-teal bg-white"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{statusLabels[s]}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg outline-none focus:border-teal bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white border border-border rounded-xl">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="px-5 py-4 border-b border-border last:border-0 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-4 w-32 bg-offwhite rounded" />
                <div className="h-4 w-24 bg-offwhite rounded" />
                <div className="h-4 w-20 bg-offwhite rounded hidden sm:block" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <AlertCircle className="w-10 h-10 text-danger mx-auto mb-3" />
          <p className="text-sm text-charcoal/60">{error}</p>
          <button onClick={loadEnquiries} className="mt-3 text-sm text-teal hover:underline">Retry</button>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white border border-border rounded-xl px-5 py-16 text-center">
          <Inbox className="w-12 h-12 text-charcoal/10 mx-auto mb-3" />
          <p className="text-sm text-charcoal/40">
            {search || status ? 'No enquiries match the selected filters.' : 'No enquiries yet.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="bg-white border border-border rounded-xl overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-offwhite/50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Mobile</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Service</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Contact</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-offwhite/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <Link to={`/admin/enquiries/${enq.id}`} className="font-medium text-charcoal hover:text-teal transition-colors">
                          {enq.full_name}
                        </Link>
                        {enq.business_name && (
                          <p className="text-xs text-charcoal/30 mt-0.5">{enq.business_name}</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-charcoal/60">{enq.mobile}</td>
                      <td className="px-5 py-3.5 text-charcoal/60 max-w-[150px] truncate">{enq.service_required}</td>
                      <td className="px-5 py-3.5 text-charcoal/60">{enq.preferred_contact_method}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColor[enq.status] || ''}`}>
                          {enq.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-charcoal/40 text-xs">
                        {new Date(enq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {enquiries.map((enq) => (
              <Link
                key={enq.id}
                to={`/admin/enquiries/${enq.id}`}
                className="block bg-white border border-border rounded-xl p-4 hover:border-teal/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-charcoal truncate">{enq.full_name}</p>
                    <p className="text-xs text-charcoal/40 mt-0.5">{enq.service_required}</p>
                  </div>
                  <span className={`flex-shrink-0 inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColor[enq.status] || ''}`}>
                    {enq.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-charcoal/40">
                  <span>{enq.mobile}</span>
                  <span>{enq.preferred_contact_method}</span>
                  <span className="ml-auto">
                    {new Date(enq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-charcoal/40">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => updateParam('page', String(page - 1))}
                  disabled={page <= 1}
                  className="p-2 border border-border rounded-lg hover:bg-offwhite disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => updateParam('page', String(page + 1))}
                  disabled={page >= totalPages}
                  className="p-2 border border-border rounded-lg hover:bg-offwhite disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
