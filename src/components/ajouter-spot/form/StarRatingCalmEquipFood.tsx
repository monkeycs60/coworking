import RatingSystem from '@/components/ui/RatingSystem';
import { RatingConfig } from '@/components/ui/RatingSystem';

export const StarRatingCalmEquipFood = ({ control, errors }: any) => {
    const ratingsConfig = [
        {
            label: 'Calme',
            type: 'calm',
            errorText: 'Veuillez évaluer le calme.',
        },
        {
            label: 'Equipement',
            type: 'equipment',
            errorText: `Veuillez évaluer l&pos;équipement.`,
        },
        {
            label: 'Food & Drinks',
            type: 'foodAndDrinks',
            errorText: 'Veuillez évaluer la nourriture et les boissons.',
        },
    ] as RatingConfig[];

    return (
        <RatingSystem
            control={control}
            errors={errors}
            ratingsConfig={ratingsConfig}
        />
    );
};
