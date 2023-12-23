import prisma from '@/lib/prisma';

export const cityList = async () => {
    const cities = await prisma.coworking.findMany({
        select: {
            city: true,
        },
    });
    return cities;
};
