import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AddPlaceSchemaType } from '@/types/addPlace';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from '@clerk/nextjs/server';
import { downloadImageAndUploadToS3 } from '@/lib/functions/uploadToS3';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function POST(req: NextRequest) {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse; // Return if there's any response from the middleware
    console.log('req.body', req.body);

    const { userId } = getAuth(req);

    const placeData = (await req.json()) as AddPlaceSchemaType;

    const formattedOpeningHours = placeData.openingHours
        ? placeData.openingHours.map((hour) => ({
              openTime: hour.open,
              closeTime: hour.close,
          }))
        : [];
    console.log('placeData', formattedOpeningHours);

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
                espressoPrice: placeData.espressoPrice,
                hasParking: placeData.hasParking,
                hasPrivacy: placeData.hasPrivacy,
                hasWiFi: placeData.hasWiFi,
                hasExterior: placeData.hasExterior,
                hasPlugs: placeData.hasPlugs,
                hasHandicap: placeData.hasHandicap,
                smallTables: placeData.smallTables,
                largeWorktables: placeData.largeWorktables,
                counterSeats: placeData.counterSeats,
                standingTables: placeData.standingTables,
                outdoorSeating: placeData.outdoorSeating,
                soloCoworker: placeData.soloCoworker,
                smallGroup: placeData.smallGroup,
                bigGroup: placeData.bigGroup,
                morningDuration: placeData.morningDuration,
                afternoonDuration: placeData.afternoonDuration,
                fullDuration: placeData.fullDuration,
                snacksPossibility: placeData.snacksPossibility,
                lunchPossibility: placeData.lunchPossibility,
                souperPossibility: placeData.souperPossibility,
                drinksPossibility: placeData.drinksPossibility,
                alcoolPossibility: placeData.alcoolPossibility,
                wifiQuality: placeData.wifiQuality,
                music: placeData.music,
                facility: placeData.facility,
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
