import { create, State } from 'zustand';
import {
    CharacteristicsType,
    ExtendedCharacteristicsType,
} from '@/types/place/characteristics';
import { ExperienceType } from '@/types/place/experience';
import { UploadedImagesType } from '@/types/place/uploadedImages';
import { ReviewType } from '@/types/place/review';
import { arrayMove } from '@dnd-kit/sortable';

type FormState = {
    stepNumber: number;
    characteristics: ExtendedCharacteristicsType;
    experience: ExperienceType;
    uploadedImages: UploadedImagesType;
    review: ReviewType;
    setStep: (stepNumber: number) => void;
    incrementStep: () => void;
    decrementStep: () => void;
    updateStep: (
        stepId: number,
        data:
            | CharacteristicsType
            | ExperienceType
            | UploadedImagesType
            | ReviewType,
    ) => void;
    addImage: (image: UploadedImagesType['imageSelectedUrls'][0]) => void;
    moveImageSelectedUrls: (from: number, to: number) => void;
    resetForm: () => void;
};

const characteristicsInitialState: ExtendedCharacteristicsType = {
    name: '',
    address: '',
    city: '',
    phoneNumber: '',
    website: '',
    description: '',
    openingHours: [],
    establishmentType: 'HOTEL_LOBBY',
    espressoPrice: '',
    facilities: [],
    latitude: 0,
    longitude: 0,
    placeId: '',
};

const uploadImagesInitialState: UploadedImagesType = {
    imageSelectedUrls: [],
};

const experienceInitialState: ExperienceType = {
    musicLevel: [],
    workComfort: [],
    internetQuality: [],
    workspaceComposition: [],
    hasToCall: [],
    drinksAndFood: [],
};

const reviewInitialState: ReviewType = {
    reviewContent: '',
    calmRating: 1,
    equipRating: 1,
    foodRating: 1,
    feelingRating: 1,
};

// Création du store avec Zustand
export const useAddCoworkingStore = create<FormState>((set) => ({
    stepNumber: 1,
    characteristics: characteristicsInitialState,
    experience: experienceInitialState,
    uploadedImages: uploadImagesInitialState,
    review: reviewInitialState,
    setStep: (stepNumber) => set({ stepNumber }),
    incrementStep: () => set((state) => ({ stepNumber: state.stepNumber + 1 })),
    decrementStep: () => set((state) => ({ stepNumber: state.stepNumber - 1 })),
    updateStep: (stepId, data) =>
        set((state) => {
            switch (stepId) {
                case 1:
                    return {
                        characteristics: data as ExtendedCharacteristicsType,
                    };
                case 2:
                    return { uploadedImages: data as UploadedImagesType };
                case 3:
                    return {
                        experience: {
                            ...state.experience,
                            ...data,
                        } as ExperienceType,
                    };
                case 4:
                    return { review: data as ReviewType };
                default:
                    return state;
            }
        }),
    addImage: (image: UploadedImagesType['imageSelectedUrls'][0]) =>
        set((state) => ({
            uploadedImages: {
                imageSelectedUrls: [
                    ...state.uploadedImages.imageSelectedUrls,
                    image,
                ],
            },
        })),
    moveImageSelectedUrls: (from, to) =>
        set((state) => {
            const imageSelectedUrls = arrayMove(
                state.uploadedImages.imageSelectedUrls,
                from,
                to,
            );
            return { uploadedImages: { imageSelectedUrls } };
        }),
    resetForm: () =>
        set({
            characteristics: characteristicsInitialState,
            uploadedImages: uploadImagesInitialState,
            experience: experienceInitialState,
            review: reviewInitialState,
        }),
}));
