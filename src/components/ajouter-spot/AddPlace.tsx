'use client';

import { AddPlaceSchemaType, AddPlaceSchema } from '@/types/addPlace';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { extractCityFromAdrAddress } from '@/lib/functions/extractCityFromAddress';
import InputField from './form/InputField';
import OpeningHours from './form/OpeningHours';
import ChooseGoogleImages from './form/ChooseGoogleImages';
import { StarRatingCalmEquipFood } from './form/StarRatingCalmEquipFood';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextAreaField from './form/TextAreaField';
import { useAddPlaceForm } from '@/hooks/useAddPlaceForm';

const AddPlace = () => {
    const {
        handleFileChange,
        onSubmit,
        setPhotoSelected,
        waitingToSubmit,
        imageUrls,
        photoSelected,
        placeDetails,
    } = useAddPlaceForm();

    const {
        vicinity,
        name,
        adr_address,
        formatted_phone_number,
        website,
        editorial_summary,
    } = placeDetails || {};

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AddPlaceSchemaType>({
        resolver: zodResolver(AddPlaceSchema),
    });

    return placeDetails ? (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col items-center justify-center gap-8 bg-zinc-200 p-12'>
                <InputField
                    register={register}
                    defaultValue={name ? name : ''}
                    label="Nom de l'établissement"
                    name='name'
                    error={errors.name}
                />
                <InputField
                    register={register}
                    defaultValue={vicinity ? vicinity : ''}
                    label='Adresse'
                    name='address'
                    error={errors.address}
                />
                <InputField
                    register={register}
                    defaultValue={
                        adr_address
                            ? extractCityFromAdrAddress(adr_address) || ''
                            : ''
                    }
                    label='Ville'
                    name='city'
                    error={errors.city}
                />
                <InputField
                    register={register}
                    defaultValue={
                        formatted_phone_number ? formatted_phone_number : ''
                    }
                    label='Numéro de téléphone'
                    name='phoneNumber'
                    error={errors.phoneNumber}
                />
                <InputField
                    register={register}
                    defaultValue={website ? website : ''}
                    label='Site web'
                    name='website'
                    error={errors.website}
                />
                <TextAreaField
                    register={register}
                    defaultValue={
                        editorial_summary?.overview
                            ? editorial_summary.overview
                            : ''
                    }
                    label='Description'
                    name='description'
                    error={errors.description}
                />

                <OpeningHours
                    register={register}
                    placeDetails={placeDetails}
                    errors={errors}
                />
                <InputField
                    register={register}
                    defaultValue=''
                    label="Prix d'un expresso (€)"
                    name='espressoPrice'
                    error={errors.espressoPrice}
                />
                <div>
                    <label htmlFor='hasPrivacy'>
                        Endroit isolé pour les calls :
                    </label>
                    <input
                        type='checkbox'
                        id='hasPrivacy'
                        {...register('hasPrivacy')}
                    />
                </div>
                <div>
                    <label htmlFor='hasParking'>Parking :</label>
                    <input
                        type='checkbox'
                        id='hasParking'
                        {...register('hasParking')}
                    />
                </div>
                <div>
                    <label htmlFor='hasExterior'>Terasse :</label>
                    <input
                        type='checkbox'
                        id='exterior'
                        {...register('hasExterior')}
                    />
                </div>
                <ChooseGoogleImages
                    imageUrls={imageUrls}
                    setPhotoSelected={setPhotoSelected}
                    photoSelected={photoSelected}
                />

                <div>
                    <label htmlFor='userImages'>Upload Images:</label>
                    <input
                        type='file'
                        id='userImages'
                        name='userImages'
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <TextAreaField
                    register={register}
                    label='Ecrivez votre avis ici'
                    name='reviewContent'
                    error={errors.reviewContent}
                />
                <StarRatingCalmEquipFood control={control} errors={errors} />
            </div>
            <Button
                variant={'default'}
                size={'sm'}
                className='w-full lg:h-12 lg:w-[320px] lg:px-4 '
                disabled={waitingToSubmit}
            >
                {waitingToSubmit ? (
                    <Loader2 className='animate-spin' />
                ) : (
                    <span>Ajouter un cowork</span>
                )}
            </Button>
            <ToastContainer />
        </form>
    ) : (
        <p>Loading...</p>
    );
};

export default AddPlace;
