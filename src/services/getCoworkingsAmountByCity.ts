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
        take: 10,
    });
    const coworksByCities = cityCounts.map(({ city, _count }) => ({
        city,
        count: _count.city,
    }));

    return { coworksByCities };
};
