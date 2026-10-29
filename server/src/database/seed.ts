import bcrypt from 'bcrypt';
import { query } from './pool';
import { config } from '../utils/config';

const SALT_ROUNDS = 12;

export async function seedAdmin(): Promise<void> {
  const { initialAdminEmail, initialAdminPassword } = config;

  if (!initialAdminEmail || !initialAdminPassword) {
    console.log('⚠ INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD not set. Skipping admin seed.');
    return;
  }

  try {
    // Check if admin already exists
    const existing = await query(
      'SELECT id FROM admin_users WHERE email = $1',
      [initialAdminEmail]
    );

    if (existing.rows.length > 0) {
      console.log('✓ Admin user already exists. Skipping seed.');
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(initialAdminPassword, SALT_ROUNDS);

    // Insert admin
    await query(
      `INSERT INTO admin_users (email, password_hash, full_name, is_active)
       VALUES ($1, $2, $3, TRUE)`,
      [initialAdminEmail, passwordHash, 'Afzal Husein Mohtesham']
    );

    console.log(`✓ Admin user created: ${initialAdminEmail}`);
  } catch (error) {
    console.error('✗ Admin seed failed:', (error as Error).message);
    throw error;
  }
}

// Run directly if executed as a script
if (require.main === module) {
  seedAdmin()
    .then(() => {
      console.log('Seed finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seed error:', err);
      process.exit(1);
    });
}
