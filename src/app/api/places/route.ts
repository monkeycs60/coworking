import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { AddPlaceSchemaType } from '@/types/addPlace';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from '@clerk/nextjs/server';

import { downloadImageAndUploadToS3 } from '@/lib/functions/uploadToS3';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);
    console.log('Retrieved User ID:', userId);

    if (!userId) {
        return NextResponse.json({
            error: "L'utilisateur n'est pas authentifié.",
        });
    }

    // Step 1: Check if User Exists in the local User table.
    const existingUser = await prisma.user.findUnique({
        where: { id: userId },
    });

    // Step 2: If the user doesn't exist, insert a basic record into the User table.
    if (!existingUser) {
        await prisma.user.create({
            data: {
                id: userId,
                // Add any other default or necessary fields here.
                // For instance, you might want to fetch user details from Clerk and save them.
            },
        });
    }

    const placeData = (await req.json()) as AddPlaceSchemaType;

    const formattedOpeningHours = placeData.openingHours
        ? {
              create: {
                  weekdayText: placeData.openingHours,
              },
          }
        : undefined;

    const imageUrlsS3 = await Promise.all(
        (placeData.imagesSelected || []).map(async (url) => {
            return await downloadImageAndUploadToS3(
                url,
                `photocoworking-${uuidv4()}.jpg`,
            );
        }),
    );

    try {
        const savedPlace = await prisma.coworking.create({
            data: {
                placeId: placeData.placeId,
                longitude: placeData.longitude,
                latitude: placeData.latitude,
                name: placeData.name,
                address: placeData.address,
                city: placeData.city,
                phoneNumber: placeData.phoneNumber,
                website: placeData.website,
                description: placeData.description,
                openingHours: formattedOpeningHours,
                espressoPrice: placeData.espressoPrice,
                hasParking: placeData.hasParking,
                hasPrivacy: placeData.hasPrivacy,
                hasExterior: placeData.hasExterior,
                reviews: {
                    create: [
                        {
                            content: placeData.reviewContent,
                            calmRating: placeData.calmRating,
                            equipRating: placeData.equipmentRating,
                            foodRating: placeData.foodRating,
                            feelingRating: placeData.feelingRating,
                            userId: userId,
                        },
                    ],
                },
                imagesSelected: {
                    create: imageUrlsS3.map((url) => ({
                        url: url,
                    })),
                },
                userImages:
                    placeData.userImages && placeData.userImages.urls
                        ? {
                              create: placeData.userImages.urls.map(
                                  (imgUrl: string) => ({
                                      url: imgUrl,
                                      userId: userId,
                                  }),
                              ),
                          }
                        : undefined,
            },
        });

        return NextResponse.json({
            message: 'ok coworking ajouté à la bdd',
            data: savedPlace,
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
