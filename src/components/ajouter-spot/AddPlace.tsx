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
                    <div>
                        <div>
                            <label htmlFor='hasParking'>Parking :</label>
                            <input
                                type='checkbox'
                                id='hasParking'
                                {...register('hasParking')}
                            />
                        </div>
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
                            <label htmlFor='hasPlugs'>
                                Prises électriques :
                            </label>
                            <input
                                type='checkbox'
                                id='hasPlugs'
                                {...register('hasPlugs')}
                            />
                        </div>
                        <div>
                            <label htmlFor='hasWiFi'>WiFi :</label>
                            <input
                                type='checkbox'
                                id='hasWiFi'
                                {...register('hasWiFi')}
                            />
                        </div>
                        <div>
                            <label htmlFor='hasExterior'>Terasse :</label>
                            <input
                                type='checkbox'
                                id='hasExterior'
                                {...register('hasExterior')}
                            />
                        </div>
                        <div>
                            <label htmlFor='hasHandicap'>
                                Accès handicapé :
                            </label>
                            <input
                                type='checkbox'
                                id='hasHandicap'
                                {...register('hasHandicap')}
                            />
                        </div>
                    </div>
                    <div>
                        <span>Espace de travail :</span>
                        <div>
                            <label htmlFor='smallTables'>Petites tables</label>
                            <input
                                type='checkbox'
                                id='smallTables'
                                {...register('smallTables')}
                            />
                        </div>

                        <div>
                            <label htmlFor='largeWorktables'>
                                Grandes tables de travail
                            </label>
                            <input
                                type='checkbox'
                                id='largeWorktables'
                                {...register('largeWorktables')}
                            />
                        </div>

                        <div>
                            <label htmlFor='standingTables'>
                                Tables hautes / mange debout
                            </label>
                            <input
                                type='checkbox'
                                id='standingTables'
                                {...register('standingTables')}
                            />
                        </div>
                        <div>
                            <label htmlFor='counterSeats'>
                                Sièges au comptoir/bar
                            </label>
                            <input
                                type='checkbox'
                                id='counterSeats'
                                {...register('counterSeats')}
                            />
                        </div>


                        <div>
                            <label htmlFor='outdoorSeating'>
                                Sièges extérieurs
                            </label>
                            <input
                                type='checkbox'
                                id='outdoorSeating'
                                {...register('outdoorSeating')}
                            />
                        </div>
                    </div>
                    <div>
                        <span>Adapté pour coworker</span>
                        <div>
                            <label htmlFor='soloCoworker'>Solo</label>
                            <input
                                type='checkbox'
                                id='soloCoworker'
                                {...register('soloCoworker')}
                            />
                        </div>
                        <div>
                            <label htmlFor='smallGroup'>En petit groupe</label>
                            <input
                                type='checkbox'
                                id='smallGroup'
                                {...register('smallGroup')}
                            />
                        </div>
                        <div>
                            <label htmlFor='bigGroup'>Nombreux</label>
                            <input
                                type='checkbox'
                                id='bigGroup'
                                {...register('bigGroup')}
                            />
                        </div>
                        <div>
                            <label htmlFor='morningDuration'>Le matin</label>
                            <input
                                type='checkbox'
                                id='morningDuration'
                                {...register('morningDuration')}
                            />
                        </div>
                        <div>
                            <label htmlFor='afternoonDuration'>
                                L&apos;après-midi
                            </label>
                            <input
                                type='checkbox'
                                id='afternoonDuration'
                                {...register('afternoonDuration')}
                            />
                        </div>
                        <div>
                            <label htmlFor='fullDuration'>
                                La journée entière
                            </label>
                            <input
                                type='checkbox'
                                id='fullDuration'
                                {...register('fullDuration')}
                            />
                        </div>
                    </div>
                    <div>
                        <span>Offre bar/restauration</span>

                        <div>
                            <label htmlFor='snacksPossibility'>
                                Collations
                            </label>
                            <input
                                type='checkbox'
                                id='snacksPossibility'
                                {...register('snacksPossibility')}
                            />
                        </div>
                        <div>
                            <label htmlFor='lunchPossibility'>Déjeuner</label>
                            <input
                                type='checkbox'
                                id='lunchPossibility'
                                {...register('lunchPossibility')}
                            />
                        </div>

                        <div>
                            <label htmlFor='souperPossibility'>Dîner</label>
                            <input
                                type='checkbox'
                                id='souperPossibility'
                                {...register('souperPossibility')}
                            />
                        </div>
                        <div>
                            <label htmlFor='drinksPossibility'>
                                Boissons froides & chaudes
                            </label>
                            <input
                                type='checkbox'
                                id='drinksPossibility'
                                {...register('drinksPossibility')}
                            />
                        </div>

                        <div>
                            <label htmlFor='alcoolPossibility'>
                                Boissons alcoolisées
                            </label>
                            <input
                                type='checkbox'
                                id='alcoolPossibility'
                                {...register('alcoolPossibility')}
                            />
                        </div>
                    </div>
                    <div>
                        <span>Musique</span>

                        <div>
                            <label htmlFor='noMusic'>Absente</label>
                            <input
                                type='checkbox'
                                id='noMusic'
                                {...register('noMusic')}
                            />
                        </div>
                        <div>
                            <label htmlFor='discreteMusic'>Discrète</label>
                            <input
                                type='checkbox'
                                id='discreteMusic'
                                {...register('discreteMusic')}
                            />
                        </div>

                        <div>
                            <label htmlFor='randomMusic'>Ca dépend</label>
                            <input
                                type='checkbox'
                                id='randomMusic'
                                {...register('randomMusic')}
                            />
                        </div>
                        <div>
                            <label htmlFor='loudMusic'>Bruyante</label>
                            <input
                                type='checkbox'
                                id='loudMusic'
                                {...register('loudMusic')}
                            />
                        </div>
                    </div>
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
