import prisma from '@/lib/prisma';

export const getAppStatistics = async () => {
    // Nombre total d'utilisateurs
    const totalUsers = await prisma.user.count();

    // Nombre total de coworkings
    const totalCoworkings = await prisma.coworking.count();

    // Nombre total de villes différentes
    const totalCities = await prisma.coworking.groupBy({
        by: ['city'],
        _count: {
            city: true,
        },
    });

    return {
        totalUsers,
        totalCoworkings,
        totalCities: totalCities.length // nombre de villes différentes
    };
};
