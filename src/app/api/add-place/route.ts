import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { AddPlaceSchemaType } from '@/types/addPlace';

const prisma = new PrismaClient();
const cs = 'test';

export default async function POST(req: NextRequest) {
    const placeData = (await req.json()) as AddPlaceSchemaType;

    try {
        const savedPlace = await prisma.coworking.create({
            data: {
                name: placeData.name,
                address: placeData.address,
                city: placeData.city,
                phoneNumber: placeData.phoneNumber,
                website: placeData.website,
                description: placeData.description,
                imageUrls: placeData.photos,
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
