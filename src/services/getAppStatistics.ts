import prisma from '@/lib/prisma';

export const getAppStatistics = async () => {
    const allCoworkings = await prisma.coworking.findMany({
        include: {
            imagesSelected: true,
            userImages: true,
            reviews: true,
        },
    });

    const totalUsers = await prisma.user.count();

    // Compter le nombre de villes uniques
    const uniqueCities = new Set(
        allCoworkings.map((coworking) => coworking.city),
    ).size;

    // Compter le total des avis
    const totalReviews = allCoworkings.reduce(
        (sum, coworking) => sum + coworking.reviews.length,
        0,
    );

    // Compter le total des images
    const totalImages = allCoworkings.reduce(
        (sum, coworking) => sum + coworking.userImages.length,
        0,
    );

    return {
        allCoworkings,
        totalUsers,
        uniqueCities,
        totalReviews,
        totalImages,
    };
};
