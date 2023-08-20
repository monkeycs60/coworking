import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { AddPlaceSchemaType } from '@/types/addPlace';

const prisma = new PrismaClient();
const cs = 'test';

export async function POST(req: NextRequest) {
    const placeData = (await req.json()) as AddPlaceSchemaType;

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
                openingHours: placeData.openingHours,
                calmRating: placeData.calmRating,
                equipmentRating: placeData.equipmentRating,
                foodAndDrinksRating: placeData.foodAndDrinksRating,
                // add more fields as necessary
            },
        });

        console.log('depuis la route on log', savedPlace);

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
