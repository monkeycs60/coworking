import { z } from 'zod';

const facility = [
    'IS_CAFE',
    'IS_HOTEL',
    'IS_LIBRARY',
    'IS_THIRD_SPACE',
    'IS_OTHER_TYPE',
] as const;

const wifiQuality = ['HIGH_WIFI', 'MEDIUM_WIFI', 'LOW_WIFI'] as const;

const music = [
    'NO_MUSIC',
    'DISCRETE_MUSIC',
    'RANDOM_MUSIC',
    'LOUD_MUSIC',
] as const;

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

export const AddPlaceSchema = z.object({
    id: z.string().optional(),
    placeId: z.string().optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
    name: z.string().min(1, 'Vous devez entrer un nom de lieu.'),
    address: z.string().min(6, 'Vous devez entrer une adresse.'),
    city: z.string().min(1, 'Vous devez entrer une ville.'),
    phoneNumber: z.string().optional(),
    website: z.string().optional(),
    description: z
        .string()
        .min(10, "Vous devez entrer une description d'au moins 10 caractères."),
    openingHours: z.array(openingHourFormat).optional(),
    imagesSelected: z.array(z.string()).optional(),
    userImages: z.any().optional(),
    espressoPrice: z.string().optional(),
    facility: z.enum(facility, {
        invalid_type_error: 'Vous devez choisir au moins un type de lieu.',
        required_error: 'Vous devez choisir au moins un type de lieu.',
    }),
    hasPrivacy: z.boolean().optional(),
    hasParking: z.boolean().optional(),
    hasWiFi: z.boolean().optional(),
    hasExterior: z.boolean().optional(),
    hasPlugs: z.boolean().optional(),
    hasHandicap: z.boolean().optional(),
    smallTables: z.boolean().optional(),
    largeWorktables: z.boolean().optional(),
    counterSeats: z.boolean().optional(),
    standingTables: z.boolean().optional(),
    outdoorSeating: z.boolean().optional(),
    soloCoworker: z.boolean().optional(),
    smallGroup: z.boolean().optional(),
    bigGroup: z.boolean().optional(),
    morningDuration: z.boolean().optional(),
    afternoonDuration: z.boolean().optional(),
    fullDuration: z.boolean().optional(),
    snacksPossibility: z.boolean().optional(),
    lunchPossibility: z.boolean().optional(),
    souperPossibility: z.boolean().optional(),
    drinksPossibility: z.boolean().optional(),
    alcoolPossibility: z.boolean().optional(),
    music: z.union([z.enum(music), z.null()]).optional(),
    wifiQuality: z.union([z.enum(wifiQuality), z.null()]).optional(),
    reviewContent: z
        .string()
        .min(10, 'Votre avis doit contenir au moins 10 caractères.'),
    calmRating: z.number().min(1).max(5),
    equipRating: z.number().min(1).max(5),
    foodRating: z.number().min(1).max(5),
    feelingRating: z.number().min(1).max(5),
});

export type AddPlaceSchemaType = z.infer<typeof AddPlaceSchema>;
