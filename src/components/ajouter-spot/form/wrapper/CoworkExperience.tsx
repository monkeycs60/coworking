import { ExperienceType, ExperienceSchema } from '@/types/place/experience';
import { Phone } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import MultipleChoice from '../inputs/MultipleChoice';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';

const CoworkExperience = () => {
    const methods = useForm<ExperienceType>({
        mode: 'all',
        resolver: zodResolver(ExperienceSchema),
    });
    const { experience, updateStep, incrementStep } = useAddCoworkingStore();
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
        <FormProvider {...methods}>
            <form
                className='flex flex-col gap-2'
                onSubmit={methods.handleSubmit((data) => {
                    console.log(data);

                    try {
                        fetch('/api/placeExperience', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log('Success:', data);
                                updateStep(3, data as ExperienceType);
                                incrementStep();
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    } catch (error) {
                        console.error('Error:', error);
                    }
                })}
            >
                <div className='flex'>
                    <Controller
                        control={methods.control}
                        defaultValue={
                            experience.musicLevel
                                ? experience.musicLevel
                                : undefined
                        }
                        name='musicLevel'
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

                    {methods.formState.errors.musicLevel && (
                        <div className='error'>
                            {methods.formState.errors.musicLevel.message}
                        </div>
                    )}
                </div>

                <div className='flex'>
                    <Controller
                        control={methods.control}
                        defaultValue={
                            experience.workComfort
                                ? experience.workComfort
                                : undefined
                        }
                        name='workComfort'
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
                    {methods.formState.errors.workComfort && (
                        <div className='error'>
                            {methods.formState.errors.workComfort.message}
                        </div>
                    )}
                </div>

                <div className='flex'>
                    <Controller
                        control={methods.control}
                        defaultValue={
                            experience.internetQuality
                                ? experience.internetQuality
                                : undefined
                        }
                        name='internetQuality'
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
                    {methods.formState.errors.internetQuality && (
                        <div className='error'>
                            {methods.formState.errors.internetQuality.message}
                        </div>
                    )}
                </div>

                <div className='flex'>
                    <Controller
                        control={methods.control}
                        defaultValue={
                            experience.workspaceComposition
                                ? experience.workspaceComposition
                                : undefined
                        }
                        name='workspaceComposition'
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
                    {methods.formState.errors.workspaceComposition && (
                        <div className='error'>
                            {
                                methods.formState.errors.workspaceComposition
                                    .message
                            }
                        </div>
                    )}
                </div>

                <div className='flex'>
                    <Controller
                        control={methods.control}
                        defaultValue={
                            experience.hasToCall
                                ? experience.hasToCall
                                : undefined
                        }
                        name='hasToCall'
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
                    {methods.formState.errors.hasToCall && (
                        <div className='error'>
                            {methods.formState.errors.hasToCall.message}
                        </div>
                    )}
                </div>

                <div className='flex'>
                    <Controller
                        control={methods.control}
                        defaultValue={
                            experience.drinksAndFood
                                ? experience.drinksAndFood
                                : undefined
                        }
                        name='drinksAndFood'
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
                    {methods.formState.errors.drinksAndFood && (
                        <div className='error'>
                            {methods.formState.errors.drinksAndFood.message}
                        </div>
                    )}
                </div>
                <button>Continuer</button>
            </form>
        </FormProvider>
    );
};

export default CoworkExperience;
