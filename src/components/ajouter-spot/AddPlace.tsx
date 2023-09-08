'use client';

import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import {
    setImageUrls,
    resetImageUrls,
} from '@/redux/features/placeDetails-slice';
import { AddPlaceSchemaType, AddPlaceSchema } from '@/types/addPlace';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, set } from 'react-hook-form';
import { extractCityFromAdrAddress } from '@/lib/functions/extractCityFromAddress';
import { useEffect, useState } from 'react';
import { sendPlaceDetails } from '@/services/sendPlaceDetails';
import InputField from './form/InputField';
import OpeningHours from './form/OpeningHours';
import ChooseGoogleImages from './form/ChooseGoogleImages';
import { StarRatingCalmEquipFood } from './form/StarRatingCalmEquipFood';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { resetAllDetails } from '@/redux/features/placeDetails-slice';
import TextAreaField from './form/TextAreaField';

const AddPlace = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

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
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
    const [waitingToSubmit, setWaitingToSubmit] = useState(false);

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

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setWaitingToSubmit(true);
        const formData = new FormData();
        if (!event.target.files) return;

        for (let i = 0; i < event.target.files.length; i++) {
            formData.append('file', event.target.files[i]);
        }

        try {
            const response = await fetch('/api/uploaded', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log(data);
            if (data.success) {
                setUploadedImageUrls(data);
                setWaitingToSubmit(false);
            } else {
                console.error(data.error);
                setWaitingToSubmit(false);
            }
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };

    const onSubmit = async (data: AddPlaceSchemaType) => {
        setWaitingToSubmit(true);
        if (!place_id) {
            alert('PlaceId is missing!');
            return;
        }
        console.log('upload data', uploadedImageUrls);

        const finalData = {
            ...data,
            placeId: place_id,
            longitude: geometry?.location.lng,
            latitude: geometry?.location.lat,
            imagesSelected: photoSelected,
            userImages: uploadedImageUrls || [],
        };

        try {
            const response = await sendPlaceDetails(finalData);
            console.log('response', response);

            if (response.error) {
                setWaitingToSubmit(false);
                toast.error(
                    "Une erreur est survenue ! le coworking n'a pas pu être ajouté.",
                    {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    },
                );
            } else {
                reset();
                toast.success('Merci à vous ! un nouveau cowork a été ajouté', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setWaitingToSubmit(false);
                //set time out to let the user see the success toast
                setTimeout(() => {
                    dispatch(resetAllDetails());
                }, 4000);
                // router.push('/');
            }
        } catch (error) {
            console.error(error);
            setWaitingToSubmit(false);
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
                    label='Prix d&pos;un expresso (€)'
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
                    name='userReview'
                    error={errors.reviews}
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
