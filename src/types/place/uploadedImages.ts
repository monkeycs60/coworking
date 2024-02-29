import { z } from 'zod';

export const UploadedImagesSchema = z.object({
    imageSelectedUrls: z
        .array(
            z.object({
                id: z.number().optional(),
                coverImage: z.boolean().optional(),
                url: z.string(),
            }),
        )
        .min(1, 'Vous devez sélectionner au moins une image.'),
});
export type UploadedImagesType = z.infer<typeof UploadedImagesSchema>;
