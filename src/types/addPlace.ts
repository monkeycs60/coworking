import { z } from 'zod';

export const AddPlaceSchema = z.object({
    placeId: z.string().optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
    name: z.string().nonempty(),
    address: z.string().nonempty(),
    city: z.string().nonempty(),
    phoneNumber: z.string().optional(),
    website: z.string().optional(),
    description: z.string().nonempty(),
    openingHours: z.array(z.string()).optional(),
    photos: z.array(z.string()).nonempty(),
    imagesSelected: z.array(z.string()).optional(),
    calmRating: z.number().min(1).max(5),
    equipmentRating: z.number().min(1).max(5),
    foodAndDrinksRating: z.number().min(1).max(5),
});

export type AddPlaceSchemaType = z.infer<typeof AddPlaceSchema>;
