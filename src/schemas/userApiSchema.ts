import * as z from 'zod';

export const userApiSchema = z.object({
    city: z.string().min(2, 'La ville est requise'),
    username: z
        .string()
        .min(3, "Le nom d'utilisateur doit faire minimum 4 caractères")
        .max(20, {
            message: "Le nom d'utilisateur doit faire maximum 20 caractères",
        })
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et des underscores",
        ),
    email: z.string().min(1, "L'adresse mail est requise").email(),
    password: z
        .string()
        .min(6, 'Le mot de passe doit faire minimum 6 caractères')
        .max(24, 'Le mot de passe doit faire maximum 24 caractères'),
});


export const UserMoreInfosSchema = z.object({
    city: z.string().min(2, { message: 'Indiquez une ville' }),
    username: z
        .string()
        .min(3, "Le nom d'utilisateur doit faire minimum 4 caractères")
        .max(20, {
            message: "Le nom d'utilisateur doit faire maximum 20 caractères",
        })
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et des underscores",
        ),
});

export type UserMoreInfosData = z.infer<typeof UserMoreInfosSchema>;


