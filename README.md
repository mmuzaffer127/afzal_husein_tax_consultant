# Afzal Husein Mohtesham — Accounts & Tax Professional

A complete professional business website and enquiry management system for **Afzal Husein Mohtesham**, Accounts & Tax Professional based in Bhatkal, Karnataka, India.

## Overview

- **Public Website**: Professional pages for services, contact, FAQs, and enquiry submission
- **Admin Dashboard**: Secure dashboard for managing enquiries, updating statuses, and tracking statistics
- **Database**: PostgreSQL-backed with proper migrations and secure session management

## Technology Stack

| Layer      | Technology                             |
|------------|----------------------------------------|
| Frontend   | React, TypeScript, Tailwind CSS, Vite  |
| Backend    | Node.js, Express.js, TypeScript        |
| Database   | PostgreSQL                             |
| Validation | Zod (shared schemas)                   |
| Auth       | express-session + connect-pg-simple    |
| Security   | Helmet, bcrypt, CORS, rate limiting    |
| Icons      | Lucide React                           |

## Requirements

- **Node.js** v18+
- **PostgreSQL** v14+
- **npm** v9+

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd afzal-husein-website

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

## Environment Variables

Copy `.env.example` to `.env` in the project root and fill in the values:

```bash
cp .env.example .env
```

| Variable               | Description                                  |
|------------------------|----------------------------------------------|
| `NODE_ENV`             | `development` or `production`                |
| `PORT`                 | Server port (default: 5000)                  |
| `DATABASE_URL`         | PostgreSQL connection string                 |
| `SESSION_SECRET`       | Long random string for session encryption    |
| `INITIAL_ADMIN_EMAIL`  | Email for the first admin account            |
| `INITIAL_ADMIN_PASSWORD`| Password for the first admin account        |
| `CLIENT_URL`           | Frontend URL for CORS (default: http://localhost:5173) |
| `GEMINI_API_KEY`       | (Optional) Google Gemini API key             |

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE afzal_husein_db;
```

2. Set `DATABASE_URL` in your `.env` file

3. Run migrations (automatically runs on server start, or manually):
```bash
cd server
npx tsx src/database/migrate.ts
```

## Initial Admin Setup

Set `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD` in your `.env` file, then run:

```bash
cd server
npx tsx src/database/seed.ts
```

The seed script will:
- Hash the password using bcrypt
- Create the admin user if one doesn't already exist
- Skip if the admin already exists (safe to re-run)

**Important**: Change the default password after first login.

## Development

Run both frontend and backend in separate terminals:

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin Dashboard: http://localhost:5173/admin

The Vite dev server proxies `/api` requests to the backend.

## Production Build

```bash
# Build frontend
cd client && npm run build

# Build backend
cd server && npm run build
```

## API Endpoints

### Public
| Method | Endpoint          | Description           |
|--------|-------------------|-----------------------|
| POST   | /api/enquiries    | Submit an enquiry     |
| GET    | /api/health       | Health check          |

### Authentication
| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| POST   | /api/admin/auth/login | Admin login        |
| POST   | /api/admin/auth/logout| Admin logout       |
| GET    | /api/admin/auth/me    | Check auth status  |

### Admin (Protected)
| Method | Endpoint                         | Description          |
|--------|----------------------------------|----------------------|
| GET    | /api/admin/dashboard/stats       | Dashboard statistics |
| GET    | /api/admin/enquiries             | List enquiries       |
| GET    | /api/admin/enquiries/:id         | Enquiry details      |
| PATCH  | /api/admin/enquiries/:id/status  | Update status        |
| PATCH  | /api/admin/enquiries/:id/notes   | Update notes         |
| GET    | /api/admin/settings              | Get settings         |
| PATCH  | /api/admin/settings              | Update settings      |

## Security Notes

- Passwords are hashed with bcrypt (12 rounds)
- Sessions use HttpOnly cookies stored in PostgreSQL
- Rate limiting on login (10 attempts/15 min) and enquiry submission (5/15 min)
- Helmet security headers enabled
- Server-side Zod validation on all inputs
- Parameterized SQL queries (no string concatenation)
- Honeypot spam protection on enquiry form
- No sensitive data exposed in API responses

## Deployment

### Frontend (Vercel)
1. Connect repo to Vercel
2. Set root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set `VITE_API_URL` environment variable to your backend URL

### Backend (Railway / Render / VPS)
1. Deploy from the `server` directory
2. Set all environment variables
3. Run migrations: `npx tsx src/database/migrate.ts`
4. Run seed: `npx tsx src/database/seed.ts`
5. Start: `npm start`

### Database (Supabase / Neon / Railway)
Use any managed PostgreSQL provider. Set the connection string in `DATABASE_URL`.

## License

Private — All rights reserved.
