// ============================================
// Shared Types — Afzal Husein Mohtesham Website
// ============================================

// --- Enquiry ---
export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';

export interface Enquiry {
  id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  business_name: string | null;
  service_required: string;
  preferred_contact_method: 'Phone' | 'WhatsApp' | 'Email';
  message: string;
  status: EnquiryStatus;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface EnquiryCreatePayload {
  full_name: string;
  mobile: string;
  email?: string;
  business_name?: string;
  service_required: string;
  preferred_contact_method: 'Phone' | 'WhatsApp' | 'Email';
  message: string;
  consent: boolean;
  honeypot?: string; // spam trap
}

export interface EnquiryStatusUpdate {
  status: EnquiryStatus;
}

export interface EnquiryNotesUpdate {
  internal_notes: string;
}

// --- Admin ---
export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// --- Dashboard Stats ---
export interface DashboardStats {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  completed: number;
  archived: number;
  recentEnquiries: Enquiry[];
}

// --- Service ---
export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  icon: string;
  whoItsFor: string[];
  process: string[];
  relatedServices: string[];
}

// --- Site Settings ---
export interface SiteSettings {
  id: string;
  business_name: string;
  professional_title: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  tagline: string | null;
  updated_at: string;
}

export interface SiteSettingsUpdate {
  business_name?: string;
  professional_title?: string;
  phone?: string;
  email?: string;
  address?: string;
  tagline?: string;
}

// --- API Response ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// --- Query Params ---
export interface EnquiryQueryParams {
  page?: number;
  limit?: number;
  status?: EnquiryStatus;
  service?: string;
  search?: string;
  sort?: 'newest' | 'oldest';
}
