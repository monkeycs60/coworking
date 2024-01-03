'use client';

import { AddPlaceSchemaType, AddPlaceSchema } from '@/types/addPlace';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePlaceSubmission } from '@/hooks/usePlaceSubmission';
import PrecompletedForm from './form/wrapper/PrecompletedForm';
import ImagesForm from './form/wrapper/ImagesForm';
import Review from './form/wrapper/Review';
import LoaderButton from '../ui/LoaderButton';
import { useState } from 'react';
import { useStep } from 'usehooks-ts';
import { useAppDispatch } from '@/hooks/useRedux';
import { resetPlaceDetails } from '@/redux/features/placeDetails-slice';
import OtherCharacteristics from './form/wrapper/OtherCharacteristics';

const AddPlace = () => {
    const dispatch = useAppDispatch();
    const [waitingToSubmit, setWaitingToSubmit] = useState(false);

    const [currentStep, { goToNextStep, goToPrevStep, setStep }] = useStep(4);

    const {
        onSubmit,
        placeDetails,
    } = usePlaceSubmission({ setWaitingToSubmit });

    const formMethods = useForm<AddPlaceSchemaType>({
        resolver: zodResolver(AddPlaceSchema),
    });


    const steps = [
        {
            id: 1,
            name: 'Confirmez les informations sur le lieu',
            subtitle: 'Nous avons pris soin de préremplir tous les champs... ou presque. Merci de bien vérifier que les informations sont exactes et de les corriger si nécessaire.',
            fields: ['name', 'address', 'city', 'description']
        },
        {
            id: 2,
            name: 'Caractéristiques du lieu',
            subtitle: 'Aidez-nous à mieux connaître le lieu et ses équipements'
        },
        {
            id: 3,
            name: 'Photos du lieu',
            subtitle: 'Partagez des photos du lieu et des espaces propices au coworking'
        },
        {
            id: 4,
            name: "C'est l'heure de partager ton expérience sur ce lieu",
            subtitle: 'Donne-nous des informations suite à ta première visite'
        },
        {
            id: 5,
            name: 'Une dernière chose : ton avis',
            subtitle: 'Comme tu es le premier à ajouter ce lieu, partage ton avis sur celui-ci à la communauté !'
        }
    ];

    const validateCurrentStep = async () => {
        let isValid = false;

        switch (currentStep) {
            case 1:
                isValid = await formMethods.trigger(['name', 'address', 'city', 'description']);
                break;
            case 2:
                isValid = await formMethods.trigger(['establishmentType', 'espressoPrice']);
                break;
            case 3:
                isValid = await formMethods.trigger(['imageSelectedUrls']);
                break;
            case 4:
                isValid = await formMethods.trigger(['reviewContent', 'calmRating', 'feelingRating', 'equipRating', 'foodRating']);
                break;
        }
        return isValid;
    };

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
                        <OtherCharacteristics errors={formMethods.formState.errors} />
                    )}
                    {currentStep === 3 && (
                        <ImagesForm />
                    )}
                    {currentStep === 4 && (
                        <>
                            <Review
                                errors={formMethods.formState.errors}
                            />
                            <LoaderButton
                                buttonClassName='my-10 w-full lg:h-12 lg:w-[320px] lg:px-4'
                                waitingToSubmit={waitingToSubmit}
                                buttonMessage='Ajouter ce cowork'
                            />
                        </>
                    )}

                    {currentStep === 1 ? (
                        <button onClick={() => {
                            dispatch(resetPlaceDetails());
                        }
                        }>
                            Retourner
                        </button>
                    ) : (
                        <button onClick={
                            goToPrevStep
                        }>
                            Précédent
                        </button>

                    )}


                    <button
                        type='button'
                        onClick={
                    currentStep === 4
                                ? () => {
                                    const isValid = formMethods.formState.isValid;
                    if (isValid) {
                        setWaitingToSubmit(true);
                    formMethods.handleSubmit(onSubmit)();
                                    }
                                }
                                : async () => {
                                    const isValid = await validateCurrentStep();
                    if (isValid) {
                        goToNextStep();
                                    }
                                }
                        }
                    disabled={currentStep === 4}
                    >
                    Suivant
                </button>
            </div>

            <ToastContainer />
        </form>
        </FormProvider >
    ) : (
    <p>Loading...</p>
);
};

export default AddPlace;
