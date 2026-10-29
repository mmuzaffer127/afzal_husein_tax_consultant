import { query, isDbConnected } from '../database/pool';
import { v4 as uuidv4 } from 'uuid';
import { localStore } from './localStore';

interface CreateEnquiryData {
  full_name: string;
  mobile: string;
  email?: string;
  business_name?: string;
  service_required: string;
  preferred_contact_method: string;
  message: string;
}

interface EnquiryFilters {
  page: number;
  limit: number;
  status?: string;
  service?: string;
  search?: string;
  sort: 'newest' | 'oldest';
}

export async function createEnquiry(data: CreateEnquiryData) {
  if (!isDbConnected()) {
    return localStore.createEnquiry(data);
  }
  const id = uuidv4();
  const result = await query(
    `INSERT INTO enquiries (id, full_name, mobile, email, business_name, service_required, preferred_contact_method, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      id,
      data.full_name,
      data.mobile,
      data.email || null,
      data.business_name || null,
      data.service_required,
      data.preferred_contact_method,
      data.message,
    ]
  );
  return result.rows[0];
}

export async function getEnquiries(filters: EnquiryFilters) {
  if (!isDbConnected()) {
    return localStore.getEnquiries(filters);
  }
  const conditions: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (filters.status) {
    conditions.push(`status = $${paramIndex}`);
    params.push(filters.status);
    paramIndex++;
  }

  if (filters.service) {
    conditions.push(`service_required = $${paramIndex}`);
    params.push(filters.service);
    paramIndex++;
  }

  if (filters.search) {
    conditions.push(
      `(full_name ILIKE $${paramIndex} OR mobile ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR business_name ILIKE $${paramIndex})`
    );
    params.push(`%${filters.search}%`);
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const orderBy = filters.sort === 'oldest' ? 'ASC' : 'DESC';
  const offset = (filters.page - 1) * filters.limit;

  // Count total
  const countResult = await query(
    `SELECT COUNT(*) as total FROM enquiries ${whereClause}`,
    params
  );
  const total = parseInt(countResult.rows[0].total, 10);

  // Get paginated results
  const dataResult = await query(
    `SELECT * FROM enquiries ${whereClause}
     ORDER BY created_at ${orderBy}
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, filters.limit, offset]
  );

  return {
    items: dataResult.rows,
    total,
    page: filters.page,
    limit: filters.limit,
    totalPages: Math.ceil(total / filters.limit),
  };
}

export async function getEnquiryById(id: string) {
  if (!isDbConnected()) {
    return localStore.getEnquiryById(id);
  }
  const result = await query('SELECT * FROM enquiries WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function updateEnquiryStatus(id: string, status: string) {
  if (!isDbConnected()) {
    return localStore.updateEnquiryStatus(id, status);
  }
  const result = await query(
    `UPDATE enquiries SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0] || null;
}

export async function updateEnquiryNotes(id: string, notes: string) {
  if (!isDbConnected()) {
    return localStore.updateEnquiryNotes(id, notes);
  }
  const result = await query(
    `UPDATE enquiries SET internal_notes = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [notes, id]
  );
  return result.rows[0] || null;
}

export async function updateEnquiry(id: string, data: { status?: string; internal_notes?: string }) {
  if (!isDbConnected()) {
    return localStore.updateEnquiry(id, data);
  }
  const fields: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (data.status) {
    fields.push(`status = $${paramIndex}`);
    params.push(data.status);
    paramIndex++;
  }

  if (data.internal_notes !== undefined) {
    fields.push(`internal_notes = $${paramIndex}`);
    params.push(data.internal_notes);
    paramIndex++;
  }

  if (fields.length === 0) return null;

  fields.push('updated_at = NOW()');
  params.push(id);

  const result = await query(
    `UPDATE enquiries SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    params
  );
  return result.rows[0] || null;
}

export async function getDashboardStats() {
  if (!isDbConnected()) {
    return localStore.getDashboardStats();
  }
  const statsResult = await query(`
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'NEW') as new,
      COUNT(*) FILTER (WHERE status = 'CONTACTED') as contacted,
      COUNT(*) FILTER (WHERE status = 'IN_PROGRESS') as in_progress,
      COUNT(*) FILTER (WHERE status = 'COMPLETED') as completed,
      COUNT(*) FILTER (WHERE status = 'ARCHIVED') as archived
    FROM enquiries
  `);

  const recentResult = await query(
    'SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5'
  );

  const stats = statsResult.rows[0];
  return {
    total: parseInt(stats.total, 10),
    new: parseInt(stats.new, 10),
    contacted: parseInt(stats.contacted, 10),
    inProgress: parseInt(stats.in_progress, 10),
    completed: parseInt(stats.completed, 10),
    archived: parseInt(stats.archived, 10),
    recentEnquiries: recentResult.rows,
  };
}
