import RatingSystem from '@/components/ui/RatingSystem';
import { RatingConfig } from '@/components/ui/RatingSystem';

export const StarRatingCalmEquipFood = () => {
    const ratingsConfig = [
        {
            label: 'Calme',
            type: 'calm',
            errorText: 'Veuillez évaluer le calme.',
        },
        {
            label: 'Equipement',
            type: 'equip',
            errorText: "Veuillez évaluer l'équipement'.",
        },
        {
            label: 'Food & Drinks',
            type: 'food',
            errorText: 'Veuillez évaluer la nourriture et les boissons.',
        },
        {
            label: 'Ressenti personnel',
            type: 'feeling',
            errorText: 'Veuillez évaluer votre ressenti.',
        }
    ] as RatingConfig[];

    return (
        <RatingSystem
            ratingsConfig={ratingsConfig}
        />
    );
};
