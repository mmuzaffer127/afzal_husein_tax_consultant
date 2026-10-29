import { Request, Response } from 'express';
import * as enquiryService from '../services/enquiryService';
import { enquiryQuerySchema } from '../shared/schemas';

// PUBLIC: Create enquiry
export async function createEnquiry(req: Request, res: Response): Promise<void> {
  try {
    const { consent, honeypot, ...data } = req.body;

    // Honeypot check
    if (honeypot) {
      // Silently accept but don't save (bot detected)
      res.status(200).json({
        success: true,
        data: { message: 'Thank you. Your enquiry has been received.' },
      });
      return;
    }

    const enquiry = await enquiryService.createEnquiry(data);

    res.status(201).json({
      success: true,
      data: {
        message: 'Thank you. Your enquiry has been received. We will contact you regarding your request.',
        id: enquiry.id,
      },
    });
  } catch (error) {
    console.error('Error creating enquiry:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Unable to submit your enquiry at the moment. Please try again or contact us directly.',
      },
    });
  }
}

// ADMIN: List enquiries
export async function getEnquiries(req: Request, res: Response): Promise<void> {
  try {
    const filters = enquiryQuerySchema.parse(req.query);
    const result = await enquiryService.getEnquiries(filters);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching enquiries:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Unable to fetch enquiries.',
      },
    });
  }
}

// ADMIN: Get single enquiry
export async function getEnquiryById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const enquiry = await enquiryService.getEnquiryById(id);

    if (!enquiry) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Enquiry not found.',
        },
      });
      return;
    }

    res.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error('Error fetching enquiry:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Unable to fetch enquiry details.',
      },
    });
  }
}

// ADMIN: Update enquiry status
export async function updateStatus(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    const enquiry = await enquiryService.updateEnquiryStatus(id, status);
    if (!enquiry) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Enquiry not found.' },
      });
      return;
    }

    res.json({ success: true, data: enquiry });
  } catch (error) {
    console.error('Error updating status:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Unable to update enquiry status.' },
    });
  }
}

// ADMIN: Update enquiry notes
export async function updateNotes(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const { internal_notes } = req.body;

    const enquiry = await enquiryService.updateEnquiryNotes(id, internal_notes);
    if (!enquiry) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Enquiry not found.' },
      });
      return;
    }

    res.json({ success: true, data: enquiry });
  } catch (error) {
    console.error('Error updating notes:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Unable to update notes.' },
    });
  }
}

// ADMIN: Update enquiry (status + notes combined)
export async function updateEnquiry(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const enquiry = await enquiryService.updateEnquiry(id, req.body);

    if (!enquiry) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Enquiry not found.' },
      });
      return;
    }

    res.json({ success: true, data: enquiry });
  } catch (error) {
    console.error('Error updating enquiry:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Unable to update enquiry.' },
    });
  }
}

// ADMIN: Dashboard stats
export async function getStats(req: Request, res: Response): Promise<void> {
  try {
    const stats = await enquiryService.getDashboardStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching stats:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Unable to fetch dashboard statistics.' },
    });
  }
}
