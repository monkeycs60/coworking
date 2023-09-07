import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { AddPlaceSchemaType } from '@/types/addPlace';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from '@clerk/nextjs/server';

import {
    downloadImageAndUploadToS3,
} from '@/lib/functions/uploadToS3';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);
    console.log('Retrieved User ID:', userId);

    if (!userId) {
        return NextResponse.json({
            error: "L'utilisateur n'est pas authentifié.",
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
                calmRating: placeData.calmRating,
                equipmentRating: placeData.equipmentRating,
                foodAndDrinksRating: placeData.foodAndDrinksRating,
                feelingRating: placeData.feelingRating,
                imagesSelected: {
                    create: imageUrlsS3.map((url) => ({
                        url: url,
                    })),
                },
                userImages: placeData.userImages && placeData.userImages.urls
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
