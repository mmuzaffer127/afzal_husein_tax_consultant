import { Request, Response } from 'express';
import * as settingsService from '../services/settingsService';

export async function getSettings(req: Request, res: Response): Promise<void> {
  try {
    const settings = await settingsService.getSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Unable to fetch settings.' },
    });
  }
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  try {
    const settings = await settingsService.updateSettings(req.body);
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error updating settings:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Unable to update settings.' },
    });
  }
}
