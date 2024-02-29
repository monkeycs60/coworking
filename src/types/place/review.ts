import { z } from 'zod';

export const ReviewSchema = z.object({
    reviewContent: z
        .string()
        .min(10, 'Votre avis doit contenir au moins 10 caractères.'),
    calmRating: z
        .number()
        .min(1, 'La note doit être comprise entre 1 et 5.')
        .max(5),
    equipRating: z
        .number()
        .min(1, 'La note doit être comprise entre 1 et 5.')
        .max(5),
    foodRating: z
        .number()
        .min(1, 'La note doit être comprise entre 1 et 5.')
        .max(5),
    feelingRating: z
        .number()
        .min(1, 'La note doit être comprise entre 1 et 5.')
        .max(5),
});
export type ReviewType = z.infer<typeof ReviewSchema>;
