import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';
import { ReviewSchema, CreateReviewType } from '@/types/createReview';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);
    console.log('samlut on essaie de faire');

    if (!userId) {
        return NextResponse.json({
            error: "L'utilisateur n'est pas authentifié.",
        });
    }

    // Step 1: Validate the input with ZOD
    // const parsedData = ReviewSchema.safeParse(req.json());
    // console.log(parsedData);

    // if (!parsedData.success) {
    //     return NextResponse.json({ error: 'Invalid data provided' });
    // }
    // Step 1: Directly get the data from the request
    const requestData: CreateReviewType = await req.json();
    console.log(requestData);

    // Step 2: Check if the user has already left a review for the given place
    const existingReview = await prisma.review.findUnique({
        where: {
            userId_coworkingId: {
                userId: userId,
                coworkingId: requestData.coworkingId,
            },
        },
    });

    if (existingReview) {
        return NextResponse.json({
            error: 'Vous avez déjà laissé un avis pour cet endroit.',
        });
    }

    // Step 3: If no existing review, then create one
    try {
        const newReview = await prisma.review.create({
            data: {
                ...requestData,
                equipRating: requestData.equipmentRating,
                coworkingId: requestData.coworkingId,
                userId: userId,
            },
        });

        return NextResponse.json({
            message: 'Review successfully added',
            data: newReview,
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
            message: 'Error while adding the review',
        });
    }
}
