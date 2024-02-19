import prisma from '@/lib/prisma';

export const getCoworkingsAmountByCity = async () => {
    const cityCounts = await prisma.coworking.groupBy({
        by: ['city'],
        _count: {
            city: true,
        },
        orderBy: {
            _count: {
                city: 'desc',
            },
        },
        take: 5,
    });

    const detailedCities = await Promise.all(
        cityCounts.map(async ({ city }) => {
            const establishmentTypes = await prisma.coworking.groupBy({
                by: ['establishmentType'],
                where: {
                    city,
                },
                _count: true,
            });

            const userCount = await prisma.user.count({
                where: {
                    city,
                },
            });

            // Préparation des données d'établissement avec comptage pour chaque type
            const establishmentCounts = establishmentTypes.map(
                ({ establishmentType, _count }) => ({
                    type: establishmentType,
                    count: _count, // Utilisation directe de _count
                }),
            );

            return {
                city,
                coworkingCount: cityCounts.find((c) => c.city === city)?._count
                    .city,
                usersInCity: userCount,
                establishments: establishmentCounts,
            };
        }),
    );

    return detailedCities;
};
