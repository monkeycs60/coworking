import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { CreateReviewType } from '@/types/createReview';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';


export async function POST(req: NextRequest) {
  
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ status: 401 });
    }


    // Step 1: Directly get the data from the request
    const requestData: CreateReviewType = await req.json();

    // Step 2: Check if the user has already left a review for the given place
    const existingReview = await prisma.review.findUnique({
        where: {
            userId_coworkingId: {
                userId: userId as string,
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
