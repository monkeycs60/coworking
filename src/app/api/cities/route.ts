import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const prisma = new PrismaClient();

    try {
        const cities = await prisma.coworking.findMany({
            select: {
                city: true,
            },
        });

        return NextResponse.json({
            message: "c'est la merdee backend",
            data: cities,
        });
    } catch (error) {
        return NextResponse.json({
            error,
        });
    }
}
