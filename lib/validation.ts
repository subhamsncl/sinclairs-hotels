import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(120),
  email: z.string().trim().email('Please enter a valid email address').max(200),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number')
    .max(20)
    .regex(/^[0-9+()\-\s]+$/, 'Please enter a valid phone number'),
  property: z.string().trim().min(1, 'Please select a property').max(60),
  checkIn: z.string().trim().max(10).optional().or(z.literal('')),
  checkOut: z.string().trim().max(10).optional().or(z.literal('')),
  guests: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : val),
    z.coerce.number().int().min(1).max(20).optional(),
  ),
  message: z.string().trim().min(10, 'Please add a few details about your stay').max(2000),
  company: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
