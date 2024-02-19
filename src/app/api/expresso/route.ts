import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, res: NextResponse) {
    // const authResponse = await authMiddleware(req);
    // if (authResponse) return authResponse; // Return if there's any response from the middleware
    try {
        if (req.body) {
            const { expressoPrice, placeId } = await req.json();

            if (!expressoPrice || !placeId) {
                return NextResponse.json({
                    message:
                        "L'ID du coworking ou le prix de l'expresso est manquant",
                    status: 'error',
                });
            }

            const updatedCoworking = await prisma.coworking.update({
                where: { placeId: placeId },
                data: { espressoPrice: expressoPrice.toString() },
            });

            return NextResponse.json({
                message: 'Prix du café updaté',
                data: updatedCoworking,
            });
        }
    } catch (error: any) {
        return NextResponse.json({
            message: 'Erreur lors de la mise à jour du prix du café',
            status: 'error',
        });
    }
}
