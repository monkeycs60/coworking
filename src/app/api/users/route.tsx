import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import {
    userApiSchema,
    UserMoreInfosSchema,
} from '@/schemas/userApiSchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Create user with email and password (Private Credentials)
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

        // console.log(newUser);

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

// Modify user infos while first login with Google Provider
export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        console.log(body);

        const { city, username } = UserMoreInfosSchema.parse(body);
        console.log(city, username);

        const session = await getServerSession(authOptions);
        console.log(session);

        const id = session?.user.id;

        console.log(id);

        const existingUser = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        console.log(existingUser);

        if (!existingUser) {
            return NextResponse.json(
                { user: null, message: 'Utilisateur introuvable' },
                { status: 404 },
            );
        }

        const updatedUser = await prisma.user.update({
            where: {
                id,
            },
            data: {
                city,
                username,
            },
        });

        console.log(updatedUser);
        return NextResponse.json({
            user: updatedUser,
            message: 'Informations utilisateur ajoutées avec succès',
        });
    } catch (error: unknown) {
        return NextResponse.json(
            {
                user: null,
                message:
                    "Erreur lors de l'ajout des informations utilisateur, rééseayez !",
            },
            { status: 500 },
        );
    }
}
