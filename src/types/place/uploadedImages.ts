import { string, z } from 'zod';

export const UploadedImagesSchema = z.object({
    imageSelectedUrls: z
        .array(
            string().url({
                message: 'Vous devez ajouter une image valide.',
            }),
        )
        .min(1, 'Vous devez sélectionner au moins une image.'),
});
export type UploadedImagesType = z.infer<typeof UploadedImagesSchema>;
