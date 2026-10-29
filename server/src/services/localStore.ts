import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../utils/config';

interface LocalEnquiry {
  id: string;
  full_name: string;
  mobile: string;
  email?: string | null;
  business_name?: string | null;
  service_required: string;
  preferred_contact_method: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  internal_notes?: string | null;
  created_at: string;
  updated_at: string;
}

interface LocalAdminUser {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface LocalSettings {
  id: string;
  business_name: string;
  professional_title: string;
  phone: string;
  email: string;
  address: string;
  tagline: string;
  updated_at: string;
}

interface StoreData {
  enquiries: LocalEnquiry[];
  admin_users: LocalAdminUser[];
  site_settings: LocalSettings;
}

const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

const DEFAULT_SETTINGS: LocalSettings = {
  id: '00000000-0000-0000-0000-000000000001',
  business_name: 'Afzal Husein Mohtesham',
  professional_title: 'Accounts & Tax Professional',
  phone: '8123033231',
  email: 'afzalmohtesham0@gmail.com',
  address: '#Square, Ameenuddin Road, Nawayath Colony, Bhatkal – 581 320, Karnataka, India',
  tagline: 'Serving Bhatkal with Trust Since 2022',
  updated_at: new Date().toISOString(),
};

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getInitialStore(): StoreData {
  const adminPasswordHash = bcrypt.hashSync(config.initialAdminPassword || 'Admin@12345', 10);
  return {
    enquiries: [
      {
        id: uuidv4(),
        full_name: 'Mohammed Suhail',
        mobile: '9876543210',
        email: 'suhail.demo@gmail.com',
        business_name: 'Suhail General Trading',
        service_required: 'GST Registration & Filing',
        preferred_contact_method: 'WhatsApp',
        message: 'Need GST registration for our new retail outlet and monthly GSTR-3B filing support.',
        status: 'NEW',
        internal_notes: 'Prospective retail client based in Bhatkal main market.',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: uuidv4(),
        full_name: 'Ahmad Tanveer',
        mobile: '9123456789',
        email: 'tanveer.ahmad@outlook.com',
        business_name: 'Tanveer Consultancy',
        service_required: 'Income Tax Return (ITR)',
        preferred_contact_method: 'Phone',
        message: 'Looking to file ITR-3 with foreign income dividend reconciliation.',
        status: 'CONTACTED',
        internal_notes: 'Spoke over phone. Awaiting Form 26AS & bank statement copies.',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
    ],
    admin_users: [
      {
        id: 'admin-001',
        email: (config.initialAdminEmail || 'admin@afzalhusein.com').toLowerCase(),
        password_hash: adminPasswordHash,
        full_name: 'Afzal Husein Mohtesham',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
    site_settings: DEFAULT_SETTINGS,
  };
}

function readStore(): StoreData {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    const initial = getInitialStore();
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Error reading local store file, resetting to initial store:', err);
    const initial = getInitialStore();
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

function writeStore(data: StoreData): void {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const localStore = {
  createEnquiry(data: {
    full_name: string;
    mobile: string;
    email?: string;
    business_name?: string;
    service_required: string;
    preferred_contact_method: string;
    message: string;
  }): LocalEnquiry {
    const store = readStore();
    const newEnquiry: LocalEnquiry = {
      id: uuidv4(),
      full_name: data.full_name,
      mobile: data.mobile,
      email: data.email || null,
      business_name: data.business_name || null,
      service_required: data.service_required,
      preferred_contact_method: data.preferred_contact_method,
      message: data.message,
      status: 'NEW',
      internal_notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.enquiries.unshift(newEnquiry);
    writeStore(store);
    return newEnquiry;
  },

  getEnquiries(filters: {
    page: number;
    limit: number;
    status?: string;
    service?: string;
    search?: string;
    sort: 'newest' | 'oldest';
  }) {
    const store = readStore();
    let items = [...store.enquiries];

    if (filters.status) {
      items = items.filter((e) => e.status.toUpperCase() === filters.status?.toUpperCase());
    }

    if (filters.service) {
      items = items.filter((e) => e.service_required.toLowerCase() === filters.service?.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(
        (e) =>
          e.full_name.toLowerCase().includes(q) ||
          e.mobile.includes(q) ||
          (e.email && e.email.toLowerCase().includes(q)) ||
          (e.business_name && e.business_name.toLowerCase().includes(q))
      );
    }

    items.sort((a, b) => {
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      return filters.sort === 'oldest' ? timeA - timeB : timeB - timeA;
    });

    const total = items.length;
    const offset = (filters.page - 1) * filters.limit;
    const paginated = items.slice(offset, offset + filters.limit);

    return {
      items: paginated,
      total,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(total / filters.limit) || 1,
    };
  },

  getEnquiryById(id: string): LocalEnquiry | null {
    const store = readStore();
    return store.enquiries.find((e) => e.id === id) || null;
  },

  updateEnquiryStatus(id: string, status: string): LocalEnquiry | null {
    const store = readStore();
    const item = store.enquiries.find((e) => e.id === id);
    if (!item) return null;
    item.status = status as LocalEnquiry['status'];
    item.updated_at = new Date().toISOString();
    writeStore(store);
    return item;
  },

  updateEnquiryNotes(id: string, notes: string): LocalEnquiry | null {
    const store = readStore();
    const item = store.enquiries.find((e) => e.id === id);
    if (!item) return null;
    item.internal_notes = notes;
    item.updated_at = new Date().toISOString();
    writeStore(store);
    return item;
  },

  updateEnquiry(id: string, data: { status?: string; internal_notes?: string }): LocalEnquiry | null {
    const store = readStore();
    const item = store.enquiries.find((e) => e.id === id);
    if (!item) return null;
    if (data.status) item.status = data.status as LocalEnquiry['status'];
    if (data.internal_notes !== undefined) item.internal_notes = data.internal_notes;
    item.updated_at = new Date().toISOString();
    writeStore(store);
    return item;
  },

  getDashboardStats() {
    const store = readStore();
    const enquiries = store.enquiries;
    const total = enquiries.length;
    const countStatus = (s: string) => enquiries.filter((e) => e.status === s).length;

    const sorted = [...enquiries].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return {
      total,
      new: countStatus('NEW'),
      contacted: countStatus('CONTACTED'),
      inProgress: countStatus('IN_PROGRESS'),
      completed: countStatus('COMPLETED'),
      archived: countStatus('ARCHIVED'),
      recentEnquiries: sorted.slice(0, 5),
    };
  },

  findAdminByEmail(email: string): LocalAdminUser | null {
    const store = readStore();
    return (
      store.admin_users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      ) || null
    );
  },

  getAdminById(id: string): Omit<LocalAdminUser, 'password_hash'> | null {
    const store = readStore();
    const user = store.admin_users.find((u) => u.id === id);
    if (!user) return null;
    const { password_hash, ...safeUser } = user;
    return safeUser;
  },

  getSettings(): LocalSettings {
    const store = readStore();
    return store.site_settings || DEFAULT_SETTINGS;
  },

  updateSettings(data: Partial<LocalSettings>): LocalSettings {
    const store = readStore();
    store.site_settings = {
      ...store.site_settings,
      ...data,
      updated_at: new Date().toISOString(),
    };
    writeStore(store);
    return store.site_settings;
  },
};
