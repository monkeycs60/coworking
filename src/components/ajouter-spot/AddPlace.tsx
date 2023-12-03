'use client';

import { AddPlaceSchemaType, AddPlaceSchema } from '@/types/addPlace';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { StarRatingCalmEquipFood } from './form/inputs/StarRatingCalmEquipFood';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextAreaField from './form/inputs/TextAreaField';
import { useAddPlaceForm } from '@/hooks/useAddPlaceForm';
import PrecompletedForm from './form/wrapper/PrecompletedForm';
import ThingsToCheck from './form/wrapper/ThingsToCheck';
import ImagesForm from './form/wrapper/ImagesForm';

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

    // const {
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<AddPlaceSchemaType>({
    //     resolver: zodResolver(AddPlaceSchema),
    // });

    const formMethods = useForm<AddPlaceSchemaType>({
        resolver: zodResolver(AddPlaceSchema),
    });

    console.log('Erreurs de validation :', formMethods.formState.errors);

    return placeDetails ? (
        <FormProvider {...formMethods}>
            <form
                onSubmit={formMethods.handleSubmit(onSubmit)}
                className='mt-10'
            >
                <div className='flex flex-col items-center justify-center gap-8'>
                    <PrecompletedForm
                        placeDetails={placeDetails}
                        errors={formMethods.formState.errors}
                    />
                    <ThingsToCheck errors={formMethods.formState.errors} />
                    <ImagesForm
                        handleFileChange={handleFileChange}
                        imageUrls={imageUrls}
                        setPhotoSelected={setPhotoSelected}
                        photoSelected={photoSelected}
                    />
                    <TextAreaField
                        label='Ecris ton avis sur ce lieu de cowork'
                        name='reviewContent'
                        error={formMethods.formState.errors.reviewContent}
                        isMandatory={true}
                    />
                    <StarRatingCalmEquipFood
                        control={formMethods.control}
                        errors={formMethods.formState.errors}
                    />
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
        </FormProvider>
    ) : (
        <p>Loading...</p>
    );
};

export default AddPlace;
