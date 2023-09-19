import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';
import { ReviewSchema, CreateReviewType } from '@/types/createReview';
import { currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function POST(req: NextRequest) {
   const authResponse = await authMiddleware(req);
   if (authResponse) return authResponse; // Return if there's any response from the middleware

   const { userId } = getAuth(req);

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
