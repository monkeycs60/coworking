import * as z from 'zod';

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(6, 'Le mot de passe doit faire minimum 6 caractères')
        .max(24, 'Le mot de passe doit faire maximum 24 caractères'),
});

export type SignInData = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
    .object({
        city: z.string().min(1, 'La ville est requise'),
        username: z
            .string()
            .min(3, "Le nom d'utilisateur doit faire minimum 4 caractères")
            .max(20, {
                message:
                    "Le nom d'utilisateur doit faire maximum 20 caractères",
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
        confirmPassword: z
            .string()
            .min(6, 'Le mot de passe doit faire minimum 6 caractères')
            .max(24, 'Le mot de passe doit faire maximum 24 caractères'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
    });

export type SignUpData = z.infer<typeof SignUpSchema>;

export type UserFormErrors = {
    [K in keyof SignUpData]?: string;
};
