import { Review } from '@/types/coworking';

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

    return (overallAverage.toFixed(2));
};
