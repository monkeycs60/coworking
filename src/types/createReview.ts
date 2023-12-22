import { z } from 'zod';

export const ReviewSchema = z.object({
    coworkingId: z.string(),
    content: z.string(),
    calmRating: z.number().min(1).max(5), // if ratings are from 1-5
    equipRating: z.number().min(1).max(5), // Renamed here
    foodRating: z.number().min(1).max(5),
    feelingRating: z.number().min(1).max(5),
    // musicLevel: z.enum(['LOUD', 'MEDIUM', 'QUIET', 'NO_MUSIC']),
    // workEnvironment: z
    //     .array(z.enum(['SOLO', 'SMALL_GROUP', 'LARGE_GROUP']))
    //     .min(1)
    //     .max(3),
    // internetQuality: z.enum(['FAST', 'GOOD', 'SLOW', 'NO_WIFI']),
    // workspaceComposition: z
    //     .array(z.enum(['SMALL_TABLES', 'LARGE_TABLES']))
    //     .min(1)
    //     .max(2),
    // workTimePreference: z
    //     .array(z.enum(['AM', 'PM']))
    //     .min(1)
    //     .max(2),
    // callPossibility: z.enum(['CALL_FRIENDLY', 'CALL_IMPOSSIBLE']),
    // availableDrinks: z
    //     .array(z.enum(['SNACKS', 'MEALS', 'HOT_DRINKS', 'ALCOHOLIC_DRINKS']))
    //     .min(1)
    //     .max(4),
});

export type CreateReviewType = z.infer<typeof ReviewSchema>;
