import { z } from 'zod';
export declare const enquiryCreateSchema: z.ZodObject<{
    full_name: z.ZodString;
    mobile: z.ZodString;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    business_name: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    service_required: z.ZodString;
    preferred_contact_method: z.ZodEnum<["Phone", "WhatsApp", "Email"]>;
    message: z.ZodString;
    consent: z.ZodLiteral<true>;
    honeypot: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    full_name: string;
    mobile: string;
    message: string;
    service_required: string;
    preferred_contact_method: "Phone" | "WhatsApp" | "Email";
    consent: true;
    email?: string | undefined;
    business_name?: string | undefined;
    honeypot?: string | undefined;
}, {
    full_name: string;
    mobile: string;
    message: string;
    service_required: string;
    preferred_contact_method: "Phone" | "WhatsApp" | "Email";
    consent: true;
    email?: string | undefined;
    business_name?: string | undefined;
    honeypot?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const enquiryStatusUpdateSchema: z.ZodObject<{
    status: z.ZodEnum<["NEW", "CONTACTED", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]>;
}, "strip", z.ZodTypeAny, {
    status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
}, {
    status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
}>;
export declare const enquiryNotesUpdateSchema: z.ZodObject<{
    internal_notes: z.ZodString;
}, "strip", z.ZodTypeAny, {
    internal_notes: string;
}, {
    internal_notes: string;
}>;
export declare const enquiryUpdateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["NEW", "CONTACTED", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]>>;
    internal_notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "NEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED" | undefined;
    internal_notes?: string | undefined;
}, {
    status?: "NEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED" | undefined;
    internal_notes?: string | undefined;
}>;
export declare const enquiryQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["NEW", "CONTACTED", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]>>;
    service: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodEnum<["newest", "oldest"]>>;
}, "strip", z.ZodTypeAny, {
    sort: "newest" | "oldest";
    page: number;
    limit: number;
    status?: "NEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED" | undefined;
    service?: string | undefined;
    search?: string | undefined;
}, {
    status?: "NEW" | "CONTACTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED" | undefined;
    sort?: "newest" | "oldest" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    service?: string | undefined;
    search?: string | undefined;
}>;
export declare const siteSettingsUpdateSchema: z.ZodObject<{
    business_name: z.ZodOptional<z.ZodString>;
    professional_title: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    tagline: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    business_name?: string | undefined;
    professional_title?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    tagline?: string | undefined;
}, {
    email?: string | undefined;
    business_name?: string | undefined;
    professional_title?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    tagline?: string | undefined;
}>;
export type EnquiryCreateInput = z.infer<typeof enquiryCreateSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type EnquiryStatusUpdateInput = z.infer<typeof enquiryStatusUpdateSchema>;
export type EnquiryNotesUpdateInput = z.infer<typeof enquiryNotesUpdateSchema>;
export type EnquiryQueryInput = z.infer<typeof enquiryQuerySchema>;
export type SiteSettingsUpdateInput = z.infer<typeof siteSettingsUpdateSchema>;
//# sourceMappingURL=index.d.ts.map