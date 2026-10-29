"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteSettingsUpdateSchema = exports.enquiryQuerySchema = exports.enquiryUpdateSchema = exports.enquiryNotesUpdateSchema = exports.enquiryStatusUpdateSchema = exports.loginSchema = exports.enquiryCreateSchema = void 0;
const zod_1 = require("zod");
// --- Indian Phone Validation ---
const indianPhoneRegex = /^[6-9]\d{9}$/;
// --- Enquiry Submission ---
exports.enquiryCreateSchema = zod_1.z.object({
    full_name: zod_1.z.string()
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(150, 'Name must not exceed 150 characters'),
    mobile: zod_1.z.string()
        .trim()
        .regex(indianPhoneRegex, 'Please enter a valid 10-digit Indian mobile number'),
    email: zod_1.z.string()
        .trim()
        .email('Please enter a valid email address')
        .max(255, 'Email must not exceed 255 characters')
        .optional()
        .or(zod_1.z.literal('')),
    business_name: zod_1.z.string()
        .trim()
        .max(255, 'Business name must not exceed 255 characters')
        .optional()
        .or(zod_1.z.literal('')),
    service_required: zod_1.z.string()
        .trim()
        .min(1, 'Please select a service')
        .max(120, 'Service selection is invalid'),
    preferred_contact_method: zod_1.z.enum(['Phone', 'WhatsApp', 'Email'], {
        errorMap: () => ({ message: 'Please select a preferred contact method' }),
    }),
    message: zod_1.z.string()
        .trim()
        .min(10, 'Message must be at least 10 characters')
        .max(5000, 'Message must not exceed 5000 characters'),
    consent: zod_1.z.literal(true, {
        errorMap: () => ({ message: 'You must consent to proceed' }),
    }),
    honeypot: zod_1.z.string().max(0).optional(), // must be empty
});
// --- Login ---
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string()
        .trim()
        .email('Please enter a valid email address')
        .max(255),
    password: zod_1.z.string()
        .min(1, 'Password is required')
        .max(128),
});
// --- Enquiry Status Update ---
exports.enquiryStatusUpdateSchema = zod_1.z.object({
    status: zod_1.z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'], {
        errorMap: () => ({ message: 'Invalid status' }),
    }),
});
// --- Enquiry Notes Update ---
exports.enquiryNotesUpdateSchema = zod_1.z.object({
    internal_notes: zod_1.z.string()
        .trim()
        .max(10000, 'Notes must not exceed 10000 characters'),
});
// --- Enquiry Full Update ---
exports.enquiryUpdateSchema = zod_1.z.object({
    status: zod_1.z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED']).optional(),
    internal_notes: zod_1.z.string().trim().max(10000).optional(),
});
// --- Query Params ---
exports.enquiryQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    status: zod_1.z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED']).optional(),
    service: zod_1.z.string().max(120).optional(),
    search: zod_1.z.string().max(200).optional(),
    sort: zod_1.z.enum(['newest', 'oldest']).default('newest'),
});
// --- Settings Update ---
exports.siteSettingsUpdateSchema = zod_1.z.object({
    business_name: zod_1.z.string().trim().min(1).max(255).optional(),
    professional_title: zod_1.z.string().trim().max(255).optional(),
    phone: zod_1.z.string().trim().max(30).optional(),
    email: zod_1.z.string().trim().email().max(255).optional(),
    address: zod_1.z.string().trim().max(1000).optional(),
    tagline: zod_1.z.string().trim().max(255).optional(),
});
//# sourceMappingURL=index.js.map