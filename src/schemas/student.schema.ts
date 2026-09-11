import { z } from 'zod';

export const createStudentSchema = z.object({
  studentCode: z.string().trim().min(1, 'studentCode is required').max(50),
  firstName: z.string().trim().min(1, 'firstName is required').max(100),
  lastName: z.string().trim().min(1, 'lastName is required').max(100),
  email: z.string().trim().email('Invalid email format').max(255),
});

export const updateStudentSchema = createStudentSchema.partial();
