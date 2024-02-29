import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { ExperienceType } from '@/types/place/experience';
import { ReviewType } from '@/types/place/review';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ status: 401 });
    }

    const placeReview = (await req.json()) as ReviewType;

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
                reviews: {
                    create: {
                        content: placeReview.reviewContent,
                        calmRating: placeReview.calmRating,
                        equipRating: placeReview.equipRating,
                        foodRating: placeReview.foodRating,
                        feelingRating: placeReview.feelingRating,
                    },
                },
            },
        });

        return NextResponse.json({
            message: 'Review ajoutée au coworking dans la bdd',
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
            message: "error lors de l'ajout de la review",
        });
    }
}
