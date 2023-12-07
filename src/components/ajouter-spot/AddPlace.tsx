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
import { useStep } from 'usehooks-ts';

const AddPlace = () => {
    const [waitingToSubmit, setWaitingToSubmit] = useState(false);

    const [currentStep, { goToNextStep, goToPrevStep, setStep }] = useStep(4);

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
                    {currentStep === 1 && (
                        <PrecompletedForm
                            placeDetails={placeDetails}
                            errors={formMethods.formState.errors}
                        />
                    )}
                    {currentStep === 2 && (
                        <ThingsToCheck errors={formMethods.formState.errors} />
                    )}
                    {currentStep === 3 && (
                        <ImagesForm
                            handleFileChange={handleFileChange}
                            imageUrls={imageUrls}
                            setPhotoSelected={setPhotoSelected}
                            photoSelected={photoSelected}
                        />
                    )}
                    {currentStep === 4 && (
                        <>
                            <Review
                                errors={formMethods.formState.errors}
                                control={formMethods.control}
                            />
                            <LoaderButton
                                buttonClassName='my-10 w-full lg:h-12 lg:w-[320px] lg:px-4'
                                waitingToSubmit={waitingToSubmit}
                                buttonMessage='Ajouter ce cowork'
                            />
                        </>
                    )}
                    <button
                        type='button'
                        onClick={goToPrevStep}
                        disabled={currentStep === 1}
                    >
                        Précédent
                    </button>
                    <button
                        type='button'
                        onClick={goToNextStep}
                        disabled={currentStep === 4}
                    >
                        Suivant
                    </button>
                </div>

                <ToastContainer />
            </form>
        </FormProvider>
    ) : (
        <p>Loading...</p>
    );
};

export default AddPlace;
