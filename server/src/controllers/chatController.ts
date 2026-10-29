import { Request, Response } from 'express';
import { askGemini } from '../services/geminiService';

export async function handleChatMessage(req: Request, res: Response): Promise<void> {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Message cannot be empty.' },
      });
      return;
    }

    if (message.length > 2000) {
      res.status(400).json({
        success: false,
        error: { code: 'MESSAGE_TOO_LONG', message: 'Message exceeds 2000 characters.' },
      });
      return;
    }

    const reply = await askGemini(message.trim(), Array.isArray(history) ? history : []);

    res.json({
      success: true,
      data: { reply },
    });
  } catch (error) {
    console.error('Chat error:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: { code: 'CHAT_ERROR', message: 'Unable to process your message at this time.' },
    });
  }
}
