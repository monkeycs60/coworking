'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePlaceSubmission } from '@/hooks/usePlaceSubmission';
import PrecompletedForm from './form/wrapper/PlaceCharacteristics';
import ImagesForm from './form/wrapper/ImagesForm';
import Review from './form/wrapper/Review';
import LoaderButton from '../ui/LoaderButton';
import { useState } from 'react';
import { useStep } from 'usehooks-ts';
import OtherCharacteristics from './form/wrapper/OtherCharacteristics';
import CoworkExperience from './form/wrapper/CoworkExperience';
import { usePlaceDetailsStore } from '@/zustand/stores/placeDetailsStore';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';
import { DevTool } from '@hookform/devtools';
import PlaceCharacteristics from './form/wrapper/PlaceCharacteristics';
import {
    ExtendedCharacteristicsType,
    CharacteristicsSchema,
} from '@/types/place/characteristics';
import GoogleImages from './form/wrapper/GoogleImages';
import Success from './form/wrapper/Success';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepContent, Typography } from '@mui/material';

const AddPlace = () => {
    const [waitingToSubmit, setWaitingToSubmit] = useState(false);

    const { resetPlaceDetails } = usePlaceDetailsStore();
    const {
        characteristics,
        uploadedImages,
        experience,
        review,
        stepNumber,
        resetForm,
        updateStep,
        incrementStep,
        decrementStep,
    } = useAddCoworkingStore();

    const [currentStep, { goToNextStep, goToPrevStep, setStep }] = useStep(5);

    const placeDetails = usePlaceDetailsStore((state) => state.details);

    // const { onSubmit, placeDetails } = usePlaceSubmission({
    //     setWaitingToSubmit,
    // });

    const formMethods = useForm<ExtendedCharacteristicsType>({
        resolver: zodResolver(CharacteristicsSchema),
    });

    const steps = [
        {
            id: 1,
            name: 'Informations sur le lieu',
            subtitle:
                'Nous avons pris soin de préremplir certains champs... ou presque.',
        },
        {
            id: 2,
            name: 'Photos du lieu',
            subtitle:
                'Partagez des photos du lieu et des espaces propices au coworking',
        },
        {
            id: 3,
            name: "C'est l'heure de partager ton expérience sur ce lieu",
            subtitle: 'Donne-nous des informations suite à ta première visite',
        },
        {
            id: 4,
            name: 'Une dernière chose : ton avis',
            subtitle:
                'Comme tu es le premier à ajouter ce lieu, partage ton avis sur celui-ci à la communauté !',
        },
    ];

    const adjustedStep = stepNumber === 3 ? 2 : 4 ? 3 : stepNumber;
    console.log('adjustedStep', adjustedStep);

    let realStep;

    switch (stepNumber) {
        case 1:
            realStep = 0;
            break;
        case 2:
            realStep = 1;
            break;
        case 3:
            realStep = 1;
            break;
        case 4:
            realStep = 2;
            break;
        case 5:
            realStep = 3;
            break;
        case 6:
            realStep = 4;
            break;
        default:
            realStep = 0;
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center gap-8 w-[60rem] bg-slate-200'>
                <Stepper activeStep={realStep} alternativeLabel>
                    {steps.map((step) => (
                        <Step key={step.id}>
                            <StepLabel>{step.name}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {stepNumber === 1 && <PlaceCharacteristics />}
                {stepNumber === 2 && <ImagesForm />}
                {stepNumber === 3 && <GoogleImages />}
                {stepNumber === 4 && <CoworkExperience />}
                {stepNumber === 5 && <Review />}
                {stepNumber === 6 && <Success />}
            </div>
            <ToastContainer />
        </>
    );
};

export default AddPlace;
