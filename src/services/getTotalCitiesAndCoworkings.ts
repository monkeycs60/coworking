import prisma from '@/lib/prisma';

export const getTotalCitiesAndCoworkings = async () => {
    try {
        const totalCoworkings = await prisma.coworking.count();

        const distinctCities = await prisma.coworking.findMany({
            select: {
                city: true,
            },
            distinct: ['city'],
        });

        const totalDistinctCities = distinctCities.length;

        return {
            totalCoworkings,
            totalDistinctCities,
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
}
