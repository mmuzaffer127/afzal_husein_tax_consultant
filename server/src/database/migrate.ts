import { query } from './pool';

const MIGRATION_SQL = `
-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(255),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(150) NOT NULL,
  mobile VARCHAR(30) NOT NULL,
  email VARCHAR(255),
  business_name VARCHAR(255),
  service_required VARCHAR(120) NOT NULL,
  preferred_contact_method VARCHAR(30) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'NEW',
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_status CHECK (status IN ('NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'))
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name VARCHAR(255) NOT NULL,
  professional_title VARCHAR(255),
  phone VARCHAR(30),
  email VARCHAR(255),
  address TEXT,
  tagline VARCHAR(255),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_mobile ON enquiries(mobile);
CREATE INDEX IF NOT EXISTS idx_enquiries_service ON enquiries(service_required);

-- Create session table for connect-pg-simple
CREATE TABLE IF NOT EXISTS "session" (
  "sid" VARCHAR NOT NULL COLLATE "default",
  "sess" JSON NOT NULL,
  "expire" TIMESTAMP(6) NOT NULL,
  CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

-- Insert default site settings if none exist
INSERT INTO site_settings (business_name, professional_title, phone, email, address, tagline)
SELECT 
  'Afzal Husein Mohtesham',
  'Accounts & Tax Professional',
  '8123033231',
  'afzalmohtesham0@gmail.com',
  '#Square, Ameenuddin Road, Nawayath Colony, Bhatkal – 581 320, Karnataka, India',
  'Serving Bhatkal with Trust Since 2022'
WHERE NOT EXISTS (SELECT 1 FROM site_settings LIMIT 1);
`;

export async function runMigrations(): Promise<void> {
  try {
    console.log('Running database migrations...');
    await query(MIGRATION_SQL);
    console.log('✓ Database migrations completed successfully');
  } catch (error) {
    console.error('✗ Migration failed:', (error as Error).message);
    throw error;
  }
}

// Run directly if executed as a script
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('Migrations finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migration error:', err);
      process.exit(1);
    });
}
