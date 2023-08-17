import { z } from 'zod';

export const AddPlaceSchema = z.object({
    placeId: z.string(),
    name: z.string(),
    address: z.string(),
    city: z.string(),
    zipCode: z.number(),
    description: z.string(),

})

export type AddPlaceSchemaType = z.infer<typeof AddPlaceSchema>;