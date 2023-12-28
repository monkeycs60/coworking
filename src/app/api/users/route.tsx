import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { userApiSchema } from '@/schemas/userApiSchema';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);

        const { city, username, email, password } = userApiSchema.parse(body);
        const role = 'USER';

        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUserByEmail) {
            return NextResponse.json(
                { user: null, message: 'Cette adresse mail est déjà prise' },
                { status: 409 },
            );
        }

        const existingUserByUsername = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (existingUserByUsername) {
            return NextResponse.json(
                {
                    user: null,
                    message: "Ce nom d'utilisateur est déjà utilisé !",
                },
                { status: 409 },
            );
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                city,
                username,
                email,
                password: hashedPassword,
                role,
            },
        });

        console.log(newUser);

        const { password: _, ...user } = newUser;

        return NextResponse.json({
            user: user,
            message: 'Votre compte a été créé avec succès',
        });
    } catch (error: unknown) {
        return NextResponse.json(
            {
                user: null,
                message:
                    'Erreur lors du remplissage du formulaire, rééssayez !',
            },
            { status: 500 },
        );
    }
}
