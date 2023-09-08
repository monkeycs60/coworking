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
    imagesSelected: z.array(z.string()).optional(),
    userImages: z.any().optional(),
    espressoPrice: z.string().optional(),
    hasPrivacy: z.boolean().optional(),
    hasParking: z.boolean().optional(),
    hasExterior: z.boolean().optional(),
    reviews: z
        .object({
            content: z.string(),
            calmRating: z.number().min(1).max(5),
            equipmentRating: z.number().min(1).max(5),
            foodAndDrinksRating: z.number().min(1).max(5),
            feelingRating: z.number().min(1).max(5),
        })
        .optional(),
});

export type AddPlaceSchemaType = z.infer<typeof AddPlaceSchema>;
