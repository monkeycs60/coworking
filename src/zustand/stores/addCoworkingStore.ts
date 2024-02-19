import { create } from 'zustand';
import { Coworking } from '@prisma/client';

const initialState = {
    id: "",
    userId: "",
    placeId: "",
    longitude: 0,
    latitude: 0,
    name: "",
    address: "",
    city: "",
    phoneNumber: null,
    website: null,
    description: "",
    openingHours: [],
    imageSelectedUrls: [],
    userImages: [],
    musicLevel: [],
    internetQuality: [],
    workComfort: [],
    workspaceComposition: [],
    hasToCall: [],
    drinksAndFood: [],
    comments: [],
    espressoPrice: null,
    establishmentType: null,
    facilities: [],
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};

const useAddCoworkingStore = create((set) => ({
    coworking: initialState,
    setCoworking: (coworking: Coworking) => set({ coworking }),
    resetCoworking: () => set(
        (state: Coworking) => ({ coworking: initialState }),
    ),
}))