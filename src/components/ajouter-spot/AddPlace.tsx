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
import { Loader2, AlertTriangle } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextAreaField from './form/TextAreaField';
import { useAddPlaceForm } from '@/hooks/useAddPlaceForm';
import CheckboxGroup from './form/CheckboxGroup';
import {
    ACCESS_SPACES,
    BAR_RESTAURANT_OFFER,
    IDEAL_TIME,
    MUSIC,
    ON_SITE_AMENITIES,
    SUITED_FOR_COWORKING,
    WORK_ZONE,
    WIFI_QUALITY,
} from '@/lib/const/amenitiesCategories';

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
        <form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
            <div className='flex flex-col items-center justify-center gap-8'>
                <InputField
                    register={register}
                    defaultValue={name ? name : ''}
                    label="Nom de l'établissement"
                    name='name'
                    error={errors.name}
                    isMandatory={true}
                />
                <InputField
                    register={register}
                    defaultValue={vicinity ? vicinity : ''}
                    label='Adresse'
                    name='address'
                    error={errors.address}
                    isMandatory={true}
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
                    isMandatory={true}
                />
                <InputField
                    register={register}
                    defaultValue={
                        formatted_phone_number ? formatted_phone_number : ''
                    }
                    label='Numéro de téléphone'
                    name='phoneNumber'
                    error={errors.phoneNumber}
                    isMandatory={false}
                />
                <InputField
                    register={register}
                    defaultValue={website ? website : ''}
                    label='Site web'
                    name='website'
                    error={errors.website}
                    isMandatory={false}
                />
                <TextAreaField
                    register={register}
                    defaultValue={
                        editorial_summary?.overview
                            ? editorial_summary.overview
                            : ''
                    }
                    label='Description'
                    subLabel="Décris le lieu, le cadre et comment le coworking s'y insère"
                    name='description'
                    error={errors.description}
                    isMandatory={true}
                />

                <OpeningHours
                    register={register}
                    placeDetails={placeDetails}
                    errors={errors}
                />
                <InputField
                    register={register}
                    defaultValue=''
                    label="Prix d'un expresso (en €)"
                    subLabel='rentre un chiffre... ex: 2.50'
                    name='espressoPrice'
                    error={errors.espressoPrice}
                />
                <div className='flex flex-col gap-6'>
                    <CheckboxGroup
                        title='Accès et espace'
                        items={ACCESS_SPACES}
                        register={register}
                    />
                    <CheckboxGroup
                        title='Commodités sur place'
                        items={ON_SITE_AMENITIES}
                        register={register}
                    />
                    <CheckboxGroup
                        title='Qualité du Wi-Fi'
                        items={WIFI_QUALITY}
                        register={register}
                    />
                    <CheckboxGroup
                        title='Zone de travail'
                        items={WORK_ZONE}
                        register={register}
                    />
                    <CheckboxGroup
                        title='Adapté pour coworker en'
                        items={SUITED_FOR_COWORKING}
                        register={register}
                    />
                    <CheckboxGroup
                        title='Moment idéal'
                        items={IDEAL_TIME}
                        register={register}
                    />
                    <CheckboxGroup
                        title='Offre bar/restauration'
                        items={BAR_RESTAURANT_OFFER}
                        register={register}
                    />
                    <CheckboxGroup
                        title='Musique'
                        items={MUSIC}
                        register={register}
                    />
                </div>
                <ChooseGoogleImages
                    imageUrls={imageUrls}
                    setPhotoSelected={setPhotoSelected}
                    photoSelected={photoSelected}
                />

                <div className='my-4 flex flex-col items-center justify-center gap-4'>
                    <label className='font-bold' htmlFor='userImages'>
                        Télécharge tes propres photos
                    </label>
                    <span className='w-[75%] text-xs italic'>
                        Sélectionne toutes les photos que tu veux uploader en
                        une seule fois
                    </span>
                    <input
                        type='file'
                        id='userImages'
                        className='flex w-full justify-between'
                        name='userImages'
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <TextAreaField
                    register={register}
                    label='Ecris ton avis sur ce lieu de cowork'
                    name='reviewContent'
                    error={errors.reviewContent}
                    isMandatory={true}
                />
                <StarRatingCalmEquipFood control={control} errors={errors} />
            </div>
            <Button
                variant={'default'}
                size={'sm'}
                className='my-10 w-full lg:h-12 lg:w-[320px] lg:px-4'
                disabled={waitingToSubmit}
            >
                {waitingToSubmit ? (
                    <Loader2 className='animate-spin' />
                ) : (
                    <span>Ajouter ce cowork</span>
                )}
            </Button>
            <ToastContainer />
        </form>
    ) : (
        <p>Loading...</p>
    );
};

export default AddPlace;
