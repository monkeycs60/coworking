import { z } from 'zod';

export const AddPlaceSchema = z.object({
    placeId: z.string(),
    name: z.string(),
    address: z.string(),
    city: z.string(),
    phoneNumber: z.string(),
    website: z.string(),
    description: z.string(),
    openingHours: z.array(z.string()),
    photos: z.array(z.string()),
    votes: z.array(z.string()),
    calmRating: z.number().min(1).max(5),
    equipmentRating: z.number().min(1).max(5),
    foodAndDrinksRating: z.number().min(1).max(5),
});

export type AddPlaceSchemaType = z.infer<typeof AddPlaceSchema>;
