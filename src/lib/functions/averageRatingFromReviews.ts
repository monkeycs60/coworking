type Review = {
    id: string;
    calmRating: number;
    equipRating: number;
    foodRating: number;
    feelingRating: number;
};

// Calcule la moyenne des notes pour un avis donné
export const averageRatingFromReviews = (reviews: Review[]) => {
    if (!reviews || reviews.length === 0) return 0; // Si pas d'avis, retourner 0

    const averageRatingForReview = (review: Review) => {
        const totalRating =
            review.calmRating +
            review.equipRating +
            review.foodRating +
            review.feelingRating;
        return totalRating / 4; // Divisé par 4 car il y a 4 catégories de notes
    };

    const overallAverage =
        reviews.reduce(
            (acc: number, review: Review) =>
                acc + averageRatingForReview(review),
            0,
        ) / reviews.length;

    return overallAverage.toFixed(2);
};

// Calcule la moyenne pour une catégorie spécifique
const averageForCategory = (
    reviews: Review[],
    category: keyof Review,
): number => {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce(
        (acc, review) => acc + (review[category] as number),
        0,
    );
    return parseFloat((total / reviews.length).toFixed(2));
};

// Fonctions pour chaque catégorie
export const calmAverage = (reviews: Review[]): number => {
    return averageForCategory(reviews, 'calmRating');
};

export const equipAverage = (reviews: Review[]): number => {
    return averageForCategory(reviews, 'equipRating');
};

export const foodAverage = (reviews: Review[]): number => {
    return averageForCategory(reviews, 'foodRating');
};

export const feelingAverage = (reviews: Review[]): number => {
    return averageForCategory(reviews, 'feelingRating');
};
