'use client';

import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import {
    setImageUrls,
    resetImageUrls,
} from '@/redux/features/placeDetails-slice';
import { AddPlaceSchemaType, AddPlaceSchema } from '@/types/addPlace';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { daysOfWeek } from '@/lib/const/daysOfWeek';
import { extractCityFromAdrAddress } from '@/lib/functions/extractCityFromAddress';
import { useEffect } from 'react';
import { sendPlaceDetails } from '@/services/sendPlaceDetails';
import StarRating from '../ui/StarRating';
import { getTimeFromDay } from '@/lib/functions/getTimeFromDay';

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

    const placeDetails = useAppSelector((state) => state.placeDetails.details);
    const placeId = useAppSelector(
        (state) => state.placeDetails.details?.place_id,
    );
    const imageUrls = useAppSelector((state) => state.placeDetails.imageUrls); // fetch image URLs from redux

    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const baseUrlImage = `https://maps.googleapis.com/maps/api/place/photo?key=${googleMapsApiKey}&`;

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

    const onSubmit = async (data: AddPlaceSchemaType) => {
        if (!placeId) {
            alert('PlaceId is missing!');
            return;
        }

        const finalData = {
            ...data,
            placeId: placeId,
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
                <div>
                    <label htmlFor='name'>Nom de l&apos;établissement</label>
                    <input
                        {...register('name')}
                        id='name'
                        name='name'
                        className='w-full bg-teal-400 p-4'
                        type='text'
                        defaultValue={
                            placeDetails.name ? placeDetails.name : ''
                        }
                    />
                    {errors.name && (
                        <p className='text-xs italic text-red-600'>
                            Veuillez entrer un nom valide.
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor='address'>Adresse</label>
                    <input
                        {...register('address')}
                        id='address'
                        name='address'
                        className='w-full bg-teal-400 p-4'
                        type='text'
                        defaultValue={
                            placeDetails.vicinity ? placeDetails.vicinity : ''
                        }
                    />
                    {errors.address && (
                        <p className='text-xs italic text-red-600'>
                            Veuillez entrer une adresse valide.
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor='city'>Ville</label>
                    <input
                        {...register('city')}
                        id='city'
                        name='city'
                        className='w-full bg-teal-400 p-4'
                        type='text'
                        defaultValue={
                            extractCityFromAdrAddress(
                                placeDetails.adr_address,
                            ) ?? ''
                        }
                    />
                    {errors.city && (
                        <p className='text-xs italic text-red-600'>
                            Veuillez entrer une ville valide.
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor='phoneNumber'>Numéro de téléphone</label>
                    <input
                        {...register('phoneNumber')}
                        id='phoneNumber'
                        name='phoneNumber'
                        className='w-full bg-teal-400 p-4'
                        type='text'
                        defaultValue={
                            placeDetails.formatted_phone_number
                                ? placeDetails.formatted_phone_number
                                : ''
                        }
                    />
                    {errors.phoneNumber && (
                        <p className='text-xs italic text-red-600'>
                            Veuillez entrer un numéro de téléphone valide.
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor='website'>Site web</label>
                    <input
                        {...register('website')}
                        id='website'
                        name='website'
                        className='w-full bg-teal-400 p-4'
                        type='text'
                        defaultValue={
                            placeDetails.website ? placeDetails.website : ''
                        }
                    />
                    {errors.website && (
                        <p className='text-xs italic text-red-600'>
                            Veuillez entrer un site web valide.
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <input
                        {...register('description')}
                        id='description'
                        name='description'
                        className='w-full bg-teal-400 p-4'
                        type='text'
                        defaultValue={
                            placeDetails.editorial_summary?.overview
                                ? placeDetails.editorial_summary.overview
                                : ''
                        }
                    />
                    {errors.description && (
                        <p className='text-xs italic text-red-600'>
                            Veuillez entrer une description valide.
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor='placeHours'>
                        Horaires d&apos;ouverture
                    </label>

                    {placeDetails.current_opening_hours &&
                    placeDetails.current_opening_hours.weekday_text
                        ? placeDetails.current_opening_hours.weekday_text.map(
                              (day: string, index: number) => (
                                  <div key={index} className='mt-2'>
                                      <label
                                          htmlFor={`openingHours.${index}`}
                                          className='block text-sm font-medium text-gray-700'
                                      >
                                          {day.split(':')[0]}
                                      </label>
                                      <input
                                          {...register(`openingHours.${index}`)}
                                          id={`openingHours.${index}`}
                                          name={`openingHours.${index}`}
                                          className='mt-1 w-full bg-teal-400 p-4'
                                          type='text'
                                          defaultValue={getTimeFromDay(day)}
                                      />
                                      {(
                                          errors as unknown as {
                                              [key: string]: any;
                                          }
                                      )[`openingHours.${index}`] && (
                                          <p className='text-xs italic text-red-600'>
                                              Veuillez entrer un horaire valide
                                          </p>
                                      )}
                                  </div>
                              ),
                          )
                        : daysOfWeek.map((day, index) => (
                              <div key={index} className='mt-2'>
                                  <label
                                      htmlFor={`openingHours.${index}`}
                                      className='block text-sm font-medium text-gray-700'
                                  >
                                      {day}
                                  </label>
                                  <input
                                      {...register(`openingHours.${index}`)}
                                      id={`openingHours.${index}`}
                                      name={`openingHours.${index}`}
                                      className='mt-1 w-full bg-teal-400 p-4'
                                      type='text'
                                      defaultValue=''
                                  />
                                  {(
                                      errors as unknown as {
                                          [key: string]: any;
                                      }
                                  )[`openingHours.${index}`] && (
                                      <p className='text-xs italic text-red-600'>
                                          Veuillez entrer un horaire valide
                                      </p>
                                  )}
                              </div>
                          ))}
                </div>

                <div>
                    {imageUrls.map((url, index) => (
                        <div key={index}>
                            <Image
                                width={200}
                                height={200}
                                src={url}
                                alt={`image de l'établissement ${index}`}
                            />
                            <Controller
                                render={({ field }) => (
                                    <input
                                        type='hidden'
                                        {...field}
                                        value={url}
                                    />
                                )}
                                name={`photos.${index}`}
                                control={control}
                                defaultValue={url}
                            />
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-between gap-3'>
                    <p className='mr-4'>Calme</p>
                    <Controller
                        name='calmRating'
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <StarRating
                                type='calm'
                                onChange={field.onChange}
                                value={field.value}
                            />
                        )}
                    />
                    {errors.calmRating && (
                        <p className='text-xs italic text-red-600'>
                            Veuillez évaluer le calme.
                        </p>
                    )}
                </div>
                <div className='flex items-center justify-between gap-3'>
                    <p className='mr-4'>Equipement</p>
                    <Controller
                        name='equipmentRating'
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <StarRating
                                type='equipment'
                                onChange={field.onChange}
                                value={field.value}
                            />
                        )}
                    />
                    {errors.equipmentRating && (
                        <p className='text-xs italic text-red-600'>
                            Veuillez évaluer l&pos;équipement.
                        </p>
                    )}
                </div>
                <div className='flex items-center justify-between gap-3'>
                    <p className='mr-4'>Food & Drinks</p>
                    <Controller
                        name='foodAndDrinksRating'
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <StarRating
                                type='foodAndDrinks'
                                onChange={field.onChange}
                                value={field.value}
                            />
                        )}
                    />
                    {errors.foodAndDrinksRating && (
                        <p className='text-xs italic text-red-600'>
                            Veuillez évaluer la nourriture et les boissons.
                        </p>
                    )}
                </div>
            </div>
            <button type='submit'>Add Place</button>
        </form>
    ) : (
        <p>Loading...</p>
    );
};

export default AddPlace;
