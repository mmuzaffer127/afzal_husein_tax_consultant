import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as authController from '../controllers/authController';
import * as enquiryController from '../controllers/enquiryController';
import * as settingsController from '../controllers/settingsController';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  loginSchema,
  enquiryStatusUpdateSchema,
  enquiryNotesUpdateSchema,
  enquiryUpdateSchema,
  siteSettingsUpdateSchema,
} from '../shared/schemas';

const router = Router();

// Login rate limiter: 10 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many login attempts. Please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ---- Auth ----
router.post('/auth/login', loginLimiter, validate(loginSchema), authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authController.me);

// ---- Protected routes ----
router.use(requireAuth);

// Dashboard
router.get('/dashboard/stats', enquiryController.getStats);

// Enquiries
router.get('/enquiries', enquiryController.getEnquiries);
router.get('/enquiries/:id', enquiryController.getEnquiryById);
router.patch('/enquiries/:id/status', validate(enquiryStatusUpdateSchema), enquiryController.updateStatus);
router.patch('/enquiries/:id/notes', validate(enquiryNotesUpdateSchema), enquiryController.updateNotes);
router.patch('/enquiries/:id', validate(enquiryUpdateSchema), enquiryController.updateEnquiry);

// Settings
router.get('/settings', settingsController.getSettings);
router.patch('/settings', validate(siteSettingsUpdateSchema), settingsController.updateSettings);

export default router;
