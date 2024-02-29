import { z } from 'zod';

const openingHourFormat = z.object({
    open: z
        .string()
        .regex(/^\d{2}:\d{2}$/, { message: "Le format doit être 'HH:MM'" })
        .or(z.literal(''))
        .nullable()
        .optional(),
    close: z
        .string()
        .regex(/^\d{2}:\d{2}$/, { message: "Le format doit être 'HH:MM'" })
        .or(z.literal(''))
        .nullable()
        .optional(),
});

const EstablishmentTypeEnum = z.enum([
    'HOTEL_LOBBY',
    'CAFE',
    'RESTAURANT_BAR',
    'THIRD_PLACE',
    'LIBRARY',
    'OTHER',
]);

const EquipmentEnum = z.enum([
    'ACCESSIBLE',
    'PARKING',
    'TERRACE',
    'OUTLETS',
    'BOOTH',
]);

export const CharacteristicsSchema = z.object({
    name: z.string().min(1, 'Vous devez entrer un nom de lieu.'),
    address: z.string().min(3, 'Vous devez entrer une adresse.'),
    city: z.string().min(1, 'Vous devez entrer une ville.'),
    phoneNumber: z.string().optional(),
    website: z.string().optional(),
    description: z
        .string()
        .min(10, "Vous devez entrer une description d'au moins 10 caractères."),
    openingHours: z.array(openingHourFormat).optional(),
    establishmentType: EstablishmentTypeEnum,
    espressoPrice: z
        .string()
        .optional()
        .refine(
            (data) => {
                if (data === undefined || data === '') return true; // Laisser passer si vide ou undefined
                const parsed = parseFloat(data);
                return !isNaN(parsed) && parsed >= 0 && parsed <= 10; // Vérifier si c'est un nombre entre 0 et 10
            },
            {
                message: 'Le prix doit être un nombre valide entre 0 et 10.',
            },
        ),
    facilities: z.array(EquipmentEnum).optional(),
});
export type CharacteristicsType = z.infer<typeof CharacteristicsSchema>;
export type ExtendedCharacteristicsType = CharacteristicsType & {
    placeId: string;
    longitude: number;
    latitude: number;
};
