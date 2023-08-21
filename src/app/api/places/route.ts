import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { AddPlaceSchemaType } from '@/types/addPlace';
import axios from 'axios';
import { S3 } from 'aws-sdk';
import { downloadImageAndUploadToS3 } from '@/lib/functions/uploadToS3';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const placeData = (await req.json()) as AddPlaceSchemaType;

    const formattedOpeningHours = placeData.openingHours
        ? {
              create: {
                  weekdayText: placeData.openingHours,
              },
          }
        : undefined;

    const imageUrlsS3 = await Promise.all(
        placeData.photos.map(async (url, index) => {
            return await downloadImageAndUploadToS3(
                url,
                `photocoworking${index}.jpg`,
            );
        }),
    );

    try {
        const savedPlace = await prisma.coworking.create({
            data: {
                placeId: placeData.placeId,
                name: placeData.name,
                address: placeData.address,
                city: placeData.city,
                phoneNumber: placeData.phoneNumber,
                website: placeData.website,
                description: placeData.description,
                imageUrls: placeData.photos,
                openingHours: formattedOpeningHours,
                calmRating: placeData.calmRating,
                equipmentRating: placeData.equipmentRating,
                foodAndDrinksRating: placeData.foodAndDrinksRating,
                photos: {
                    create: imageUrlsS3.map((url) => ({
                        url: url,
                    })),
                },
                // add more fields as necessary
            },
        });

        return NextResponse.json({
            message: 'ok coworking ajouté à la bdd',
            data: savedPlace,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: error,
            message: 'error lors de l ajout du coworking a la bdd',
        });
    }
}
