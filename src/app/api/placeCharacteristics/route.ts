import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ExtendedCharacteristicsType } from '@/types/place/characteristics';
import { v4 as uuidv4 } from 'uuid';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { cp } from 'fs';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ status: 401 });
    }

    const placeCharacteristics =
        (await req.json()) as ExtendedCharacteristicsType;

    const formattedOpeningHours = placeCharacteristics.openingHours
        ? placeCharacteristics.openingHours.map((hour) => ({
              openTime: hour.open,
              closeTime: hour.close,
          }))
        : [];

    try {
        const savedPlaceCharacteristics = await prisma.coworking.create({
            data: {
                placeId: placeCharacteristics.placeId,
                userId: userId,
                longitude: placeCharacteristics.longitude,
                latitude: placeCharacteristics.latitude,
                name: placeCharacteristics.name,
                address: placeCharacteristics.address,
                city: placeCharacteristics.city,
                phoneNumber: placeCharacteristics.phoneNumber,
                website: placeCharacteristics.website,
                description: placeCharacteristics.description,
                openingHours: {
                    create: formattedOpeningHours,
                },
                establishmentType: placeCharacteristics.establishmentType,
                espressoPrice: placeCharacteristics.espressoPrice,
                facilities: placeCharacteristics.facilities,
            },
        });

        return NextResponse.json({
            message: 'Caractéristiques ajoutées au coworking dans la bdd',
            data: savedPlaceCharacteristics,
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
            message: "error lors de l'ajout des caractéristiques",
        });
    }
}
