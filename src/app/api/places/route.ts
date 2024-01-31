import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ExtendedAddPlaceSchemaType } from '@/types/addPlace';
import { v4 as uuidv4 } from 'uuid';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    console.log('session', session)
    const userId = session?.user?.id;

    // if (!userId) {
    //     return NextResponse.json({ status: 401 });
    // }

    const placeData = (await req.json()) as ExtendedAddPlaceSchemaType;
    console.log('placeData', placeData);

    const formattedOpeningHours = placeData.openingHours
        ? placeData.openingHours.map((hour) => ({
              openTime: hour.open,
              closeTime: hour.close,
          }))
        : [];
    console.log('placeData', formattedOpeningHours);

    try {
        const savedPlace = await prisma.coworking.create({
            data: {
                placeId: placeData.placeId,
                userId: userId,
                longitude: placeData.longitude,
                latitude: placeData.latitude,
                name: placeData.name,
                address: placeData.address,
                city: placeData.city,
                phoneNumber: placeData.phoneNumber,
                website: placeData.website,
                description: placeData.description,
                openingHours: {
                    create: formattedOpeningHours,
                },
                establishmentType: placeData.establishmentType,
                espressoPrice: placeData.espressoPrice,
                facilities: placeData.facilities,
                imageSelectedUrls: {
                    create: placeData.imageSelectedUrls.map((image) => ({
                        url: image.url,
                        coverImage: image.coverImage,
                    })),
                },
                musicLevel: placeData.musicLevel,
                workComfort: placeData.workComfort,
                internetQuality: placeData.internetQuality,
                workspaceComposition: placeData.workspaceComposition,
                hasToCall: placeData.hasToCall,
                drinksAndFood: placeData.drinksAndFood,

                reviews: {
                    create: [
                        {
                            content: placeData.reviewContent,
                            calmRating: placeData.calmRating,
                            equipRating: placeData.equipRating,
                            foodRating: placeData.foodRating,
                            feelingRating: placeData.feelingRating,
                            userId: userId,
                        },
                    ],
                },
            },
            include: {
                reviews: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        const reviewWithUser = await prisma.review.findUnique({
            where: { id: savedPlace.reviews[0].id },
            include: { user: true },
        });

        return NextResponse.json({
            message: 'ok coworking ajouté à la bdd',
            data: savedPlace,
            reviewWithUser,
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
            message: 'error lors de l ajout du coworking a la bdd',
        });
    }
}
