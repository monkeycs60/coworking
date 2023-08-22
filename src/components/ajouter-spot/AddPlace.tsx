'use client';

import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import {
    setImageUrls,
    resetImageUrls,
} from '@/redux/features/placeDetails-slice';
import { AddPlaceSchemaType, AddPlaceSchema } from '@/types/addPlace';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { extractCityFromAdrAddress } from '@/lib/functions/extractCityFromAddress';
import { useEffect, useState } from 'react';
import { sendPlaceDetails } from '@/services/sendPlaceDetails';
import StarRating from '../ui/StarRating';
import InputField from './form/InputField';
import OpeningHours from './form/OpeningHours';
import ChooseGoogleImages from './form/ChooseGoogleImages';
import { StarRatingCalmEquipFood } from './form/StarRatingCalmEquipFood';

const AddPlace = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddPlaceSchemaType>({
        resolver: zodResolver(AddPlaceSchema),
    });

    const imageUrls = useAppSelector((state) => state.placeDetails.imageUrls); // fetch image URLs from redux
    const placeDetails = useAppSelector((state) => state.placeDetails.details);

    const {
        place_id,
        geometry,
        vicinity,
        name,
        adr_address,
        formatted_phone_number,
        website,
        editorial_summary,
        current_opening_hours,
    } = placeDetails || {};

    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const baseUrlImage = `https://maps.googleapis.com/maps/api/place/photo?key=${googleMapsApiKey}&`;

    const [photoSelected, setPhotoSelected] = useState<string[]>([]);
    const [userFiles, setUserFiles] = useState<File[]>([]);

    useEffect(() => {
        if (placeDetails?.photos) {
            dispatch(resetImageUrls());

            const urls = placeDetails.photos
                .slice(0, Math.ceil(placeDetails.photos.length / 2))
                .map((photo) => {
                    return `${baseUrlImage}maxwidth=400&photoreference=${photo.photo_reference}`;
                });
            dispatch(setImageUrls(urls)); // update redux state
        }
    }, [placeDetails, dispatch, baseUrlImage]);

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files) {
    //         setUserFiles(Array.from(event.target.files));
    //     }
    // };

    const onSubmit = async (data: AddPlaceSchemaType) => {
        if (!place_id) {
            alert('PlaceId is missing!');
            return;
        }
        // console.log('upload data', data.userImages);

        const finalData = {
            ...data,
            placeId: place_id,
            longitude: geometry?.location.lng,
            latitude: geometry?.location.lat,
            imagesSelected: photoSelected,
        };

        try {
            console.log('data de sendplace form', finalData);

            const response = await sendPlaceDetails(finalData);
            console.log('response', response);

            if (response) reset();
        } catch (error) {
            console.error(error);
        }
    };

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
                <InputField
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
                <ChooseGoogleImages
                    imageUrls={imageUrls}
                    setPhotoSelected={setPhotoSelected}
                    photoSelected={photoSelected}
                />

                {/* <div>
                    <label htmlFor='userImages'>Upload Images:</label>
                    <input
                        {...register('userImages')}
                        type='file'
                        id='userImages'
                        name='userImages'
                        multiple
                        onChange={handleFileChange}
                    />
                </div> */}
                <StarRatingCalmEquipFood control={control} errors={errors} />
            </div>
            <button type='submit'>Add Place</button>
        </form>
    ) : (
        <p>Loading...</p>
    );
};

export default AddPlace;
