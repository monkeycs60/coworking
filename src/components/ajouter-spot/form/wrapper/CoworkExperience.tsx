import { AddPlaceSchemaType } from '@/types/addPlace';
import { Phone } from 'lucide-react';
import { FieldErrors, useFormContext, Controller } from 'react-hook-form';
import MultipleChoice from '../inputs/MultipleChoice';

const CoworkExperience = ({ errors }: {
    errors: FieldErrors<AddPlaceSchemaType>;
}) => {
    const { control, watch } = useFormContext<AddPlaceSchemaType>();
    console.log('errors', watch());
    const musicOptions = [
        { label: 'Pas de musique', value: 'NoMusic', svg: <Phone /> },
        { label: 'Musique discrète', value: 'DiscreteMusic', svg: <Phone /> },
        { label: 'Musique aléatoire', value: 'RandomMusic', svg: <Phone /> },
        { label: 'Musique forte', value: 'LoudMusic', svg: <Phone /> },
    ];
    const workComfortOptions = [
        { label: 'Solo', value: 'SoloDesk' },
        { label: 'Petit groupe', value: 'SmallGroupDesk' },
        { label: 'Grand groupe', value: 'LargeGroupDesk' },
    ];
    const internetQualityOptions = [
        { label: 'Wi-Fi rapide', value: 'HighWifi' },
        { label: 'Wi-Fi correct', value: 'MediumWifi' },
        { label: 'Wi-Fi faible', value: 'LowWifi' },
        { label: 'Pas de Wi-Fi', value: 'NoWifi' },
    ];
    const workspaceCompositionOptions = [
        { label: 'Cabines privées', value: 'PrivateBooths' },
        { label: 'Grandes tables', value: 'LargeTables' },
    ];
    const callOptions = [
        { label: 'Appels autorisés', value: 'CallFriendly' },
        { label: 'Appels impossibles', value: 'CallImpossible' },
    ];
    const drinksAndFoodOptions = [
        { label: 'Snacks', value: 'Snacks' },
        { label: 'Repas', value: 'Meals' },
        { label: 'Boissons non-alcoolisées', value: 'SoftDrinks' },
        { label: 'Boissons alcoolisées', value: 'AlcoholicDrinks' },
    ];

    return (
        <div>
            <div className='flex'>
                <Controller
                    control={control}
                    name="musicLevel"
                    render={({ field }) => (
                        <>
                            {musicOptions.map((option) => (
                                <MultipleChoice
                                    key={option.value}
                                    name={field.name}
                                    value={option.value}
                                    label={option.label}
                                    svg={option.svg}
                                    maxChoices={1}
                                />
                            ))}
                        </>
                    )}
                />
                {
                    errors.musicLevel && <div className="error">{errors.musicLevel.message}</div>
                }
            </div>

            <div className='flex'>
                <Controller
                    control={control}
                    name="workComfort"
                    render={({ field }) => (
                        <>
                            {workComfortOptions.map((option) => (
                                <MultipleChoice
                                    key={option.value}
                                    name={field.name}
                                    value={option.value}
                                    label={option.label}
                                    maxChoices={3}
                                />
                            ))}
                        </>
                    )}
                />
                {
                    errors.workComfort && <div className="error">{errors.workComfort.message}</div>
                }
            </div>

            <div className='flex'>
                <Controller
                    control={control}
                    name="internetQuality"
                    render={({ field }) => (
                        <>
                            {internetQualityOptions.map((option) => (
                                <MultipleChoice
                                    key={option.value}
                                    name={field.name}
                                    value={option.value}
                                    label={option.label}
                                    maxChoices={1}
                                />
                            ))}
                        </>
                    )}
                />
                {
                    errors.internetQuality && <div className="error">{errors.internetQuality.message}</div>
                }
            </div>

            <div className='flex'>
                <Controller
                    control={control}
                    name="workspaceComposition"
                    render={({ field }) => (
                        <>
                            {workspaceCompositionOptions.map((option) => (
                                <MultipleChoice
                                    key={option.value}
                                    name={field.name}
                                    value={option.value}
                                    label={option.label}
                                    maxChoices={2}
                                />
                            ))}
                        </>
                    )}
                />
                {
                    errors.workspaceComposition && <div className="error">{errors.workspaceComposition.message}</div>
                }
            </div>

            <div className='flex'>
                <Controller
                    control={control}
                    name="hasToCall"
                    render={({ field }) => (
                        <>
                            {callOptions.map((option) => (
                                <MultipleChoice
                                    key={option.value}
                                    name={field.name}
                                    value={option.value}
                                    label={option.label}
                                    maxChoices={1}
                                />
                            ))}
                        </>
                    )}
                />
                {
                    errors.hasToCall && <div className="error">{errors.hasToCall.message}</div>
                }
            </div>

            <div className='flex'>
                <Controller
                    control={control}
                    name="drinksAndFood"
                    render={({ field }) => (
                        <>
                            {drinksAndFoodOptions.map((option) => (
                                <MultipleChoice
                                    key={option.value}
                                    name={field.name}
                                    value={option.value}
                                    label={option.label}
                                    maxChoices={4}
                                />
                            ))}
                        </>
                    )}
                />
                {
                    errors.drinksAndFood && <div className="error">{errors.drinksAndFood.message}</div>
                }
            </div >
        </div >
    )
}

export default CoworkExperience