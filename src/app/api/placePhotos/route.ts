import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { UploadedImagesType } from '@/types/place/uploadedImages';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ status: 401 });
    }

    const placePhotos = (await req.json()) as UploadedImagesType;

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

        const savedPlacePhotos = await prisma.coworking.update({
            where: {
                id: lastCoworkingAdded.id,
            },
            data: {
                imageSelectedUrls: {
                    create: placePhotos.imageSelectedUrls.map((img) => ({
                        url: img.url,
                        coverImage: img.coverImage ?? false,
                    })),
                },
            },
        });

        return NextResponse.json({
            message: 'Caractéristiques ajoutées au coworking dans la bdd',
            data: savedPlacePhotos,
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
