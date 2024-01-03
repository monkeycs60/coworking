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
  'HOTEL_LOBBY', // Lobby d'hôtel
  'CAFE',        // Café
  'RESTAURANT_BAR', // Restaurant-Bar
  'THIRD_PLACE', // Tiers-lieu
  'LIBRARY',     // Bibliothèque
  'OTHER',       // Autre
]);

const EquipmentEnum = z.enum([
  'ACCESSIBLE',
  'PARKING',
  'TERRACE',
  'OUTLETS',
  'BOOTH',
]);

const StepOneSchema = z.object({
  name: z.string().min(1, 'Vous devez entrer un nom de lieu.'),
  address: z.string().min(3, 'Vous devez entrer une adresse.'),
  city: z.string().min(1, 'Vous devez entrer une ville.'),
  phoneNumber: z.string().optional(),
  website: z.string().optional(),
  description: z
    .string()
    .min(10, "Vous devez entrer une description d'au moins 10 caractères."),
  openingHours: z.array(openingHourFormat).optional(),
});

const StepTwoSchema = z.object({
  establishmentType: EstablishmentTypeEnum,
  espressoPrice: z
    .string()
    .optional()
    .refine((data) => {
      if (data === undefined || data === "") return true; // Laisser passer si vide ou undefined
      const parsed = parseFloat(data);
      return !isNaN(parsed) && parsed >= 0 && parsed <= 10; // Vérifier si c'est un nombre entre 0 et 10
    }, {
      message: "Le prix doit être un nombre valide entre 0 et 10.",
    }),
  facilities: z.array(EquipmentEnum).optional(), // Ici, on rend la sélection d'équipement optionnelle
});

const StepThreeSchema = z.object({
  imageSelectedUrls: z.array(z.object({
    id: z.number().optional(),
    coverImage: z.boolean().optional(),
    url: z.string(),
  })),
});

const StepFourSchema = z.object({
  reviewContent: z
    .string()
    .min(10, 'Votre avis doit contenir au moins 10 caractères.'),
  calmRating: z.number().min(1).max(5),
  equipRating: z.number().min(1).max(5),
  foodRating: z.number().min(1).max(5),
  feelingRating: z.number().min(1).max(5),
});

export const AddPlaceSchema = StepOneSchema.merge(StepTwoSchema).merge(StepThreeSchema).merge(StepFourSchema).merge(z.object({
  placeId: z.string().optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
}));

export type AddPlaceSchemaType = z.infer<typeof AddPlaceSchema>;
