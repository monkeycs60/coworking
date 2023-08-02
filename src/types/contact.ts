import { z } from 'zod';

export const ContactSchema = z.object({
	email: z.string().email(),
	subject: z.string().min(4),
	message: z.string().min(10),
});

export type ContactSchemaType = z.infer<typeof ContactSchema>;
