import { Request, Response } from 'express';
import * as authService from '../services/authService';

// Login
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const admin = await authService.findAdminByEmail(email);

    if (!admin) {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password.',
        },
      });
      return;
    }

    if (!admin.is_active) {
      res.status(401).json({
        success: false,
        error: {
          code: 'ACCOUNT_INACTIVE',
          message: 'Invalid email or password.',
        },
      });
      return;
    }

    const isValid = await authService.verifyPassword(password, admin.password_hash);

    if (!isValid) {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password.',
        },
      });
      return;
    }

    // Set session
    req.session.userId = admin.id;
    req.session.email = admin.email;

    res.json({
      success: true,
      data: {
        id: admin.id,
        email: admin.email,
        full_name: admin.full_name,
      },
    });
  } catch (error) {
    console.error('Login error:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred during login.',
      },
    });
  }
}

// Logout
export async function logout(req: Request, res: Response): Promise<void> {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      res.clearCookie('ahm.sid');
      res.clearCookie('connect.sid');
      res.json({ success: true, data: { message: 'Logged out successfully.' } });
    });
  } catch (error) {
    console.error('Logout error:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'An error occurred during logout.' },
    });
  }
}

// Get current user
export async function me(req: Request, res: Response): Promise<void> {
  try {
    if (!req.session.userId) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated.' },
      });
      return;
    }

    const admin = await authService.getAdminById(req.session.userId);

    if (!admin || !admin.is_active) {
      req.session.destroy(() => {});
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated.' },
      });
      return;
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error('Auth check error:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'An error occurred.' },
    });
  }
}
