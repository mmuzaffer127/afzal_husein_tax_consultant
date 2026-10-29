import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { handleChatMessage } from '../controllers/chatController';

const router = Router();

// Chat rate limiter: 30 requests per 10 minutes per IP
const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many chat messages. Please wait a moment before sending another query.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', chatLimiter, handleChatMessage);

export default router;
