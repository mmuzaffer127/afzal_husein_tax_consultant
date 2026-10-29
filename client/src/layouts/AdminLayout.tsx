import { useState } from 'react';
import { Outlet, NavLink, Navigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Inbox, Settings, ExternalLink, LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { business } from '../lib/business';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/admin/enquiries', icon: Inbox, label: 'Enquiries', end: false },
  { to: '/admin/settings', icon: Settings, label: 'Settings', end: true },
];

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="w-8 h-8 border-3 border-teal/20 border-t-teal rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-navy z-50 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Admin Dashboard</h2>
                <p className="text-[10px] text-white/40 mt-0.5 truncate">{user.email}</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-white/40 hover:text-white"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-white/10 space-y-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3.5 py-2.5 text-sm text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Website
            </a>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-4 sm:px-6 h-14">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 text-charcoal/60 hover:text-charcoal rounded-lg hover:bg-offwhite"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-sm font-medium text-charcoal/70">
                {business.name}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-charcoal/40 hidden sm:block">
                {user.full_name || user.email}
              </span>
              <button
                onClick={logout}
                className="p-1.5 text-charcoal/40 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
