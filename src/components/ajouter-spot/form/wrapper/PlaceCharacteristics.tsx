import InputField from '../inputs/InputField';
import OpeningHours from '../inputs/OpeningHours';
import TextAreaField from '../inputs/TextAreaField';
import { PlaceDetail } from '@/types/placeDetails';
import { extractCityFromAdrAddress } from '@/lib/functions/extractCityFromAddress';
import {
    Controller,
    FieldErrors,
    FormProvider,
    useForm,
    useFormContext,
} from 'react-hook-form';
import { usePlaceDetailsStore } from '@/zustand/stores/placeDetailsStore';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';
import {
    CharacteristicsSchema,
    ExtendedCharacteristicsType,
} from '@/types/place/characteristics';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

const PlaceCharacteristics = () => {
    const placeDetails = usePlaceDetailsStore((state) => state.details);

    const {
        vicinity,
        name,
        adr_address,
        formatted_phone_number,
        website,
        editorial_summary,
    } = placeDetails as PlaceDetail;

    const methods = useForm<ExtendedCharacteristicsType>({
        mode: 'all',
        resolver: zodResolver(CharacteristicsSchema),
    });
    const {
        characteristics,
        stepNumber,
        updateStep,
        incrementStep,
        decrementStep,
    } = useAddCoworkingStore();

    console.log({ stepNumber });

    type EquipmentEnum =
        | 'ACCESSIBLE'
        | 'PARKING'
        | 'TERRACE'
        | 'OUTLETS'
        | 'BOOTH';
    const equipmentOptions: { value: EquipmentEnum; label: string }[] = [
        { value: 'ACCESSIBLE', label: 'Accès handicapé' },
        { value: 'PARKING', label: 'Parking' },
        { value: 'TERRACE', label: 'Terrasse' },
        { value: 'OUTLETS', label: 'Prises' },
        { value: 'BOOTH', label: 'Isoloir' },
    ];

    const handleEspressoPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;

        if (!value) {
            methods.setValue('espressoPrice', '');
            return;
        }

        // Remplacer la virgule par un point et appliquer l'expression régulière
        const match = value.replace(',', '.').match(/^\d*(\.\d{0,2})?/);

        // Vérifier que match n'est pas null avant d'accéder à ses éléments
        if (match && match[0]) {
            methods.setValue('espressoPrice', match[0]);
        }
    };

    const handleEquipmentClick = (equipment: EquipmentEnum) => {
        const currentFacilities = methods.getValues('facilities') || [];
        methods.setValue(
            'facilities',
            currentFacilities.includes(equipment)
                ? currentFacilities.filter((e: string) => e !== equipment)
                : [...currentFacilities, equipment],
        );
    };

    return (
        <>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit((data) => {
                        const completeData: ExtendedCharacteristicsType = {
                            ...data,
                            longitude: placeDetails?.geometry.location.lng || 0,
                            latitude: placeDetails?.geometry.location.lat || 0,
                            placeId: placeDetails?.place_id || '',
                        };

                        try {
                            fetch('/api/placeCharacteristics', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(completeData),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log('Success:', data);

                                    updateStep(
                                        1,
                                        completeData as ExtendedCharacteristicsType,
                                    );

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
                    <InputField
                        defaultValue={name ? name : ''}
                        label="Nom de l'établissement"
                        name='name'
                        isMandatory={true}
                    />
                    <InputField
                        defaultValue={vicinity ? vicinity : ''}
                        label='Adresse'
                        name='address'
                        isMandatory={true}
                    />
                    <InputField
                        defaultValue={
                            adr_address
                                ? extractCityFromAdrAddress(adr_address) || ''
                                : ''
                        }
                        label='Ville'
                        name='city'
                        isMandatory={true}
                    />
                    <InputField
                        defaultValue={
                            formatted_phone_number ? formatted_phone_number : ''
                        }
                        label='Numéro de téléphone'
                        name='phoneNumber'
                        isMandatory={false}
                    />
                    <InputField
                        defaultValue={website ? website : ''}
                        label='Site web'
                        name='website'
                        isMandatory={false}
                    />
                    <TextAreaField
                        defaultValue={editorial_summary?.overview ?? ''}
                        label='Description'
                        subLabel="Décris le lieu, le cadre et comment le coworking s'y insère"
                        name='description'
                        isMandatory={true}
                    />

                    <OpeningHours />

                    <Controller
                        name='establishmentType'
                        control={methods.control}
                        defaultValue={characteristics.establishmentType || ''}
                        render={({ field }) => (
                            <select {...field} className='w-[180px]'>
                                <option value=''>Type d'établissement</option>
                                <option value='HOTEL_LOBBY'>
                                    Lobby d'hôtel
                                </option>
                                <option value='CAFE'>Café</option>
                                <option value='RESTAURANT_BAR'>
                                    Restaurant-Bar
                                </option>
                                <option value='THIRD_PLACE'>Tiers-lieu</option>
                                <option value='LIBRARY'>Bibliothèque</option>
                                <option value='OTHER'>Autre</option>
                            </select>
                        )}
                    />
                    {methods.formState.errors.establishmentType && (
                        <span className='text-red-500'>
                            Ce champ est requis
                        </span>
                    )}
                    <Controller
                        control={methods.control}
                        defaultValue={characteristics.espressoPrice || ''}
                        name='espressoPrice'
                        render={({ field }) => (
                            <input
                                {...field}
                                type='text'
                                placeholder="Prix de l'espresso"
                                className='w-[180px]'
                                onChange={handleEspressoPriceChange}
                            />
                        )}
                    />
                    {methods.formState.errors.espressoPrice && (
                        <span className='text-red-500'>
                            Ce champ est requis
                        </span>
                    )}

                    {equipmentOptions.map((option) => (
                        <Controller
                            key={option.value}
                            control={methods.control}
                            defaultValue={characteristics.facilities || []}
                            name='facilities'
                            render={({ field }) => (
                                <button
                                    type='button'
                                    onClick={() =>
                                        handleEquipmentClick(option.value)
                                    }
                                    className={`rounded-md border-2 p-2 ${
                                        methods
                                            .getValues('facilities')
                                            ?.includes(option.value)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-black'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            )}
                        />
                    ))}
                    {methods.formState.errors.facilities && (
                        <span className='text-red-500'>
                            Ce champ est requis
                        </span>
                    )}

                    <button>Valider le form</button>
                </form>
            </FormProvider>
            <DevTool control={methods.control} />
        </>
    );
};

export default PlaceCharacteristics;
