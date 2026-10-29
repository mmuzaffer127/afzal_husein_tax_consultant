import bcrypt from 'bcrypt';
import { query, isDbConnected } from '../database/pool';
import { localStore } from './localStore';

export async function findAdminByEmail(email: string) {
  if (!isDbConnected()) {
    return localStore.findAdminByEmail(email);
  }
  const result = await query(
    'SELECT * FROM admin_users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getAdminById(id: string) {
  if (!isDbConnected()) {
    return localStore.getAdminById(id);
  }
  const result = await query(
    'SELECT id, email, full_name, is_active, created_at, updated_at FROM admin_users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}
