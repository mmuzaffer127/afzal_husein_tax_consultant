import { z } from 'zod';

// --- Indian Phone Validation ---
const indianPhoneRegex = /^[6-9]\d{9}$/;

// --- Enquiry Submission ---
export const enquiryCreateSchema = z.object({
  full_name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(150, 'Name must not exceed 150 characters'),
  mobile: z.string()
    .trim()
    .regex(indianPhoneRegex, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters')
    .optional()
    .or(z.literal('')),
  business_name: z.string()
    .trim()
    .max(255, 'Business name must not exceed 255 characters')
    .optional()
    .or(z.literal('')),
  service_required: z.string()
    .trim()
    .min(1, 'Please select a service')
    .max(120, 'Service selection is invalid'),
  preferred_contact_method: z.enum(['Phone', 'WhatsApp', 'Email'], {
    errorMap: () => ({ message: 'Please select a preferred contact method' }),
  }),
  message: z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must not exceed 5000 characters'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to proceed' }),
  }),
  honeypot: z.string().max(0).optional(), // must be empty
});

// --- Login ---
export const loginSchema = z.object({
  email: z.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255),
  password: z.string()
    .min(1, 'Password is required')
    .max(128),
});

// --- Enquiry Status Update ---
export const enquiryStatusUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),
});

// --- Enquiry Notes Update ---
export const enquiryNotesUpdateSchema = z.object({
  internal_notes: z.string()
    .trim()
    .max(10000, 'Notes must not exceed 10000 characters'),
});

// --- Enquiry Full Update ---
export const enquiryUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED']).optional(),
  internal_notes: z.string().trim().max(10000).optional(),
});

// --- Query Params ---
export const enquiryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED']).optional(),
  service: z.string().max(120).optional(),
  search: z.string().max(200).optional(),
  sort: z.enum(['newest', 'oldest']).default('newest'),
});

// --- Settings Update ---
export const siteSettingsUpdateSchema = z.object({
  business_name: z.string().trim().min(1).max(255).optional(),
  professional_title: z.string().trim().max(255).optional(),
  phone: z.string().trim().max(30).optional(),
  email: z.string().trim().email().max(255).optional(),
  address: z.string().trim().max(1000).optional(),
  tagline: z.string().trim().max(255).optional(),
});

export type EnquiryCreateInput = z.infer<typeof enquiryCreateSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type EnquiryStatusUpdateInput = z.infer<typeof enquiryStatusUpdateSchema>;
export type EnquiryNotesUpdateInput = z.infer<typeof enquiryNotesUpdateSchema>;
export type EnquiryQueryInput = z.infer<typeof enquiryQuerySchema>;
export type SiteSettingsUpdateInput = z.infer<typeof siteSettingsUpdateSchema>;
