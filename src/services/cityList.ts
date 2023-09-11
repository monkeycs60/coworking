import { PrismaClient } from '@prisma/client';

export const cityList = async () => {
    const prisma = new PrismaClient();
    const cities = await prisma.coworking.findMany({
        select: {
            city: true,
        },
    });
    return cities;
};
