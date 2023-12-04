'use client';

import { AddPlaceSchemaType, AddPlaceSchema } from '@/types/addPlace';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePlaceSubmission } from '@/hooks/usePlaceSubmission';
import PrecompletedForm from './form/wrapper/PrecompletedForm';
import ThingsToCheck from './form/wrapper/ThingsToCheck';
import ImagesForm from './form/wrapper/ImagesForm';
import Review from './form/wrapper/Review';
import LoaderButton from '../ui/LoaderButton';
import { useState } from 'react';

const AddPlace = () => {
    const [waitingToSubmit, setWaitingToSubmit] = useState(false);

    const {
        handleFileChange,
        onSubmit,
        setPhotoSelected,
        imageUrls,
        photoSelected,
        placeDetails,
    } = usePlaceSubmission({ setWaitingToSubmit });

    const formMethods = useForm<AddPlaceSchemaType>({
        resolver: zodResolver(AddPlaceSchema),
    });

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
                    <Review
                        errors={formMethods.formState.errors}
                        control={formMethods.control}
                    />
                    <LoaderButton
                        buttonClassName='my-10 w-full lg:h-12 lg:w-[320px] lg:px-4'
                        waitingToSubmit={waitingToSubmit}
                        buttonMessage='Ajouter ce cowork'
                    />
                </div>

                <ToastContainer />
            </form>
        </FormProvider>
    ) : (
        <p>Loading...</p>
    );
};

export default AddPlace;
