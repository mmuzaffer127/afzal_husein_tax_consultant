import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as enquiryController from '../controllers/enquiryController';
import { validate } from '../middleware/validate';
import { enquiryCreateSchema } from '../shared/schemas';

const router = Router();

// Rate limit enquiry submissions: 5 per 15 minutes per IP
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many enquiries submitted. Please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/enquiries
router.post(
  '/',
  enquiryLimiter,
  validate(enquiryCreateSchema),
  enquiryController.createEnquiry
);

export default router;
