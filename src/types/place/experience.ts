import { z } from 'zod';

export const ExperienceSchema = z.object({
    musicLevel: z
        .array(z.enum(['NoMusic', 'DiscreteMusic', 'RandomMusic', 'LoudMusic']))
        .min(1, 'Vous devez au moins sélectionner un choix')
        .max(1, "Vous ne pouvez pas sélectionner plus d'un choix"),
    workComfort: z
        .array(z.enum(['SoloDesk', 'SmallGroupDesk', 'LargeGroupDesk']))
        .min(1, 'Vous devez au moins sélectionner un choix')
        .max(3),
    internetQuality: z
        .array(z.enum(['HighWifi', 'MediumWifi', 'LowWifi', 'NoWifi']))
        .min(1, 'Vous devez au moins sélectionner un choix')
        .max(1, "Vous ne pouvez pas sélectionner plus d'un choix"),
    workspaceComposition: z
        .array(z.enum(['PrivateBooths', 'LargeTables']))
        .min(1, 'Vous devez au moins sélectionner un choix')
        .max(2),
    hasToCall: z
        .array(z.enum(['CallFriendly', 'CallImpossible']))
        .min(1, 'Vous devez au moins sélectionner un choix')
        .max(1, "Vous ne pouvez pas sélectionner plus d'un choix"),
    drinksAndFood: z
        .array(z.enum(['Snacks', 'Meals', 'SoftDrinks', 'AlcoholicDrinks']))
        .min(1, 'Vous devez au moins sélectionner un choix')
        .max(4),
});
export type ExperienceType = z.infer<typeof ExperienceSchema>;