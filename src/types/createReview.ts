import { z } from 'zod';

export const ReviewSchema = z.object({
    coworkingId: z.string(),
    content: z.string(),
    calmRating: z.number().min(1).max(5), // if ratings are from 1-5
    equipRating: z.number().min(1).max(5), // Renamed here
    foodRating: z.number().min(1).max(5),
    feelingRating: z.number().min(1).max(5),
});

export type CreateReviewType = z.infer<typeof ReviewSchema>;
