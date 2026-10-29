import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, CheckCircle, Phone as PhoneIcon, Clock, Archive, AlertCircle, ArrowRight } from 'lucide-react';
import { getDashboardStats } from '../../lib/api';

interface Stats {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  completed: number;
  archived: number;
  recentEnquiries: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-charcoal">Dashboard</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-5 animate-pulse">
              <div className="h-3 w-20 bg-offwhite rounded" />
              <div className="h-8 w-12 bg-offwhite rounded mt-3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-10 h-10 text-danger mx-auto mb-3" />
        <p className="text-sm text-charcoal/60">{error}</p>
        <button onClick={loadStats} className="mt-3 text-sm text-teal hover:underline">Retry</button>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    { label: 'Total Enquiries', value: stats.total, icon: Inbox, color: 'text-teal', bg: 'bg-teal/10' },
    { label: 'New', value: stats.new, icon: AlertCircle, color: 'text-info', bg: 'bg-info-bg' },
    { label: 'Contacted', value: stats.contacted, icon: PhoneIcon, color: 'text-warning', bg: 'bg-warning-bg' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-success', bg: 'bg-success-bg' },
  ];

  const statusColor: Record<string, string> = {
    NEW: 'bg-info text-white',
    CONTACTED: 'bg-warning text-white',
    IN_PROGRESS: 'bg-gold text-white',
    COMPLETED: 'bg-success text-white',
    ARCHIVED: 'bg-charcoal/20 text-charcoal/60',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-charcoal">Dashboard</h1>
        <Link
          to="/admin/enquiries"
          className="text-sm text-teal hover:underline flex items-center gap-1"
        >
          View All Enquiries <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-charcoal/40 uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${card.bg} ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-charcoal">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white border border-border rounded-xl">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-charcoal">Recent Enquiries</h2>
        </div>

        {stats.recentEnquiries.length > 0 ? (
          <div className="divide-y divide-border">
            {stats.recentEnquiries.map((enq: any) => (
              <Link
                key={enq.id}
                to={`/admin/enquiries/${enq.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-offwhite transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm font-medium text-charcoal truncate">{enq.full_name}</p>
                    <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColor[enq.status] || ''}`}>
                      {enq.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal/40 mt-0.5 truncate">
                    {enq.service_required} · {enq.mobile}
                  </p>
                </div>
                <span className="text-xs text-charcoal/30 ml-3 flex-shrink-0">
                  {new Date(enq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <Inbox className="w-10 h-10 text-charcoal/10 mx-auto mb-3" />
            <p className="text-sm text-charcoal/40">No enquiries yet.</p>
            <p className="text-xs text-charcoal/30 mt-1">Enquiries submitted through the website will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
