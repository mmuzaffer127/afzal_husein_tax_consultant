import { query, isDbConnected } from '../database/pool';
import { localStore } from './localStore';

export async function getSettings() {
  if (!isDbConnected()) {
    return localStore.getSettings();
  }
  const result = await query('SELECT * FROM site_settings LIMIT 1');
  return result.rows[0] || null;
}

export async function updateSettings(data: {
  business_name?: string;
  professional_title?: string;
  phone?: string;
  email?: string;
  address?: string;
  tagline?: string;
}) {
  if (!isDbConnected()) {
    return localStore.updateSettings(data);
  }
  const settings = await getSettings();
  if (!settings) return null;

  const fields: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  const entries = Object.entries(data);
  for (const [key, value] of entries) {
    if (value !== undefined) {
      fields.push(`${key} = $${paramIndex}`);
      params.push(value);
      paramIndex++;
    }
  }

  if (fields.length === 0) return settings;

  fields.push('updated_at = NOW()');
  params.push(settings.id);

  const result = await query(
    `UPDATE site_settings SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    params
  );
  return result.rows[0] || null;
}
