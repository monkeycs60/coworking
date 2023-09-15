import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AddPlaceSchemaType } from '@/types/addPlace';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';
import { downloadImageAndUploadToS3 } from '@/lib/functions/uploadToS3';

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);
    const user: User | null = await currentUser();

    console.log('clerk user from backend', user);
    console.log(user?.firstName);

    // Impeed unlogged user to send request
    if (!userId) {
        return NextResponse.json({
            error: "L'utilisateur n'est pas authentifié.",
        });
    }

    // Step 1: Check if User Exists in the local User table.
    const existingUser = await prisma.user.findUnique({
        where: { id: userId },
    });

    console.log(existingUser);

    // Step 2: If the user doesn't exist, insert a basic record into the User table.
    if (!existingUser) {
        await prisma.user.upsert({
            where: { email: user?.emailAddresses[0].emailAddress },
            update: {
                username: user?.username,
                name: `${user?.firstName} ${user?.lastName}`,
                email: user?.emailAddresses[0].emailAddress,
                image: user?.imageUrl,
                createdAt: user?.createdAt
                    ? new Date(user.createdAt)
                    : new Date(),
            },
            create: {
                id: userId,
                username: user?.username,
                name: `${user?.firstName} ${user?.lastName}`,
                email: user?.emailAddresses[0].emailAddress,
                image: user?.imageUrl,
                createdAt: user?.createdAt
                    ? new Date(user.createdAt)
                    : new Date(),
            },
        });
    }

    const placeData = (await req.json()) as AddPlaceSchemaType;
    console.log(placeData);

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
                userId: userId,
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
                noMusic: placeData.noMusic,
                discreteMusic: placeData.discreteMusic,
                randomMusic: placeData.randomMusic,
                loudMusic: placeData.loudMusic,
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
                reviews: true,
            },
        });

        const reviewWithUser = await prisma.review.findUnique({
            where: { id: savedPlace.reviews[0].id },
            include: { user: true },
        });

        return NextResponse.json({
            message: 'ok coworking ajouté à la bdd',
            data: savedPlace, reviewWithUser,
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
