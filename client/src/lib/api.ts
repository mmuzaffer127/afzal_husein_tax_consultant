const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface RequestOptions {
  method?: string;
  body?: unknown;
  params?: Record<string, string | number | undefined>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, params } = options;

  let url = `${API_BASE}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error?.message || 'An unexpected error occurred.');
  }

  return data.data;
}

// --- Public ---
export function submitEnquiry(payload: unknown) {
  return request('/enquiries', { method: 'POST', body: payload });
}

export function sendChatMessage(message: string, history?: { role: 'user' | 'model'; parts: { text: string }[] }[]) {
  return request<{ reply: string }>('/chat', {
    method: 'POST',
    body: { message, history },
  });
}

// --- Auth ---
export function login(email: string, password: string) {
  return request<{ id: string; email: string; full_name: string }>('/admin/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function logout() {
  return request('/admin/auth/logout', { method: 'POST' });
}

export function getMe() {
  return request<{ id: string; email: string; full_name: string; is_active: boolean }>('/admin/auth/me');
}

// --- Admin Enquiries ---
export function getEnquiries(params?: Record<string, string | number | undefined>) {
  return request<{
    items: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>('/admin/enquiries', { params });
}

export function getEnquiryById(id: string) {
  return request<any>(`/admin/enquiries/${id}`);
}

export function updateEnquiryStatus(id: string, status: string) {
  return request(`/admin/enquiries/${id}/status`, { method: 'PATCH', body: { status } });
}

export function updateEnquiryNotes(id: string, internal_notes: string) {
  return request(`/admin/enquiries/${id}/notes`, { method: 'PATCH', body: { internal_notes } });
}

// --- Admin Dashboard ---
export function getDashboardStats() {
  return request<{
    total: number;
    new: number;
    contacted: number;
    inProgress: number;
    completed: number;
    archived: number;
    recentEnquiries: any[];
  }>('/admin/dashboard/stats');
}

// --- Admin Settings ---
export function getSettings() {
  return request<any>('/admin/settings');
}

export function updateSettings(data: Record<string, string>) {
  return request('/admin/settings', { method: 'PATCH', body: data });
}
