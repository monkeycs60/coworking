import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { ExperienceType } from '@/types/place/experience';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ status: 401 });
    }

    const placeExperiences = (await req.json()) as ExperienceType;

    try {
        const lastCoworkingAdded = await prisma.coworking.findFirst({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!lastCoworkingAdded) {
            return NextResponse.json({
                message: 'Aucun coworking trouvé pour cet utilisateur',
            });
        }

        const savedPlaceExperience = await prisma.coworking.update({
            where: {
                id: lastCoworkingAdded.id,
            },
            data: {
                musicLevel: placeExperiences.musicLevel,
                workComfort: placeExperiences.workComfort,
                internetQuality: placeExperiences.internetQuality,
                workspaceComposition: placeExperiences.workspaceComposition,
                hasToCall: placeExperiences.hasToCall,
                drinksAndFood: placeExperiences.drinksAndFood,
            },
        });

        return NextResponse.json({
            message: 'Expériences ajoutées au coworking dans la bdd',
            data: savedPlaceExperience,
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
            message: "error lors de l'ajout des expériences",
        });
    }
}
