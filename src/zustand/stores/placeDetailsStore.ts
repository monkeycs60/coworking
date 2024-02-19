import { create } from 'zustand';
import { PlaceDetail } from '@/types/placeDetails';

interface PlaceDetailsState {
    details: PlaceDetail | null;
    setPlaceDetails: (details: PlaceDetail) => void;
    resetPlaceDetails: () => void;
}

export const usePlaceDetailsStore = create<PlaceDetailsState>((set) => ({
    details: null,
    setPlaceDetails: (details) => set({ details }),
    resetPlaceDetails: () => set({ details: null }),
}));