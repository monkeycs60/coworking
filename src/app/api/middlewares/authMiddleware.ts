import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';

export async function authMiddleware(req: NextRequest) {
    const { userId } = getAuth(req);
    const user: User | null = await currentUser();

    if (!userId) {
        return NextResponse.json({
            error: "L'utilisateur n'est pas authentifié.",
        });
    }

    const existingUser = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!existingUser) {
        await prisma.user.upsert({
            where: { email: user?.emailAddresses[0].emailAddress },
            update: {
                username: user?.username,
                name: `${user?.firstName} ${user?.lastName}`,
                email: user?.emailAddresses[0].emailAddress,
                image: user?.imageUrl,
                createdAt: user?.createdAt
                    ? new Date(user.createdAt)
                    : new Date(),
            },
            create: {
                id: userId,
                username: user?.username,
                name: `${user?.firstName} ${user?.lastName}`,
                email: user?.emailAddresses[0].emailAddress,
                image: user?.imageUrl,
                createdAt: user?.createdAt
                    ? new Date(user.createdAt)
                    : new Date(),
            },
        });
    }

    return null; // Continue with next steps
}
