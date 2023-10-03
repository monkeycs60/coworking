'use client';

import SideBarFilter from '@/components/layout/SideBarFilter';
import Map from '@/components/explore/Map';
import CoworkingCard from '@/components/explore/cards/CoworkingCard';
import { Coworking } from '@/types/coworking';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
    calmAverage,
    equipAverage,
    feelingAverage,
    foodAverage,
} from '@/lib/functions/averageRatingFromReviews';

interface DisplayFilteredCoworkingProps {
    citySelected: string;
    cityCenterCoords: {
        lat: number;
        lng: number;
    };
    coworkingLocations: {
        lat: number;
        lng: number;
        name: string;
    }[];
    city: string;
    coworkings: Coworking[];
}

const DisplayFilteredCoworking = ({
    citySelected,
    cityCenterCoords,
    coworkingLocations,
    city,
    coworkings,
}: DisplayFilteredCoworkingProps) => {
    const dispatch = useAppDispatch();
    const filteredState = useAppSelector((state) => state.filter);
    console.log('filteredState', filteredState);

    const areAllFiltersUnchecked = () => {
        return Object.values(filteredState).every((value) => !value);
    };

    const filteredCoworkings = coworkings.filter((coworking) => {
        if (areAllFiltersUnchecked()) return true;
        if (filteredState.Café && coworking.facility === 'IS_CAFE') {
            return true;
        }
        if (filteredState.Hôtel && coworking.facility === 'IS_HOTEL') {
            return true;
        }
        if (filteredState.Bibliothèque && coworking.facility === 'IS_LIBRARY') {
            return true;
        }
        if (
            filteredState.Tiers_lieu &&
            coworking.facility === 'IS_THIRD_SPACE'
        ) {
            return true;
        }
        if (filteredState.Autre && coworking.facility === 'IS_OTHER_TYPE') {
            return true;
        }
        if (filteredState.Calme) {
            return coworking.reviews
                ? calmAverage(coworking.reviews) >= 3.75
                : null;
        }
        if (filteredState.Equipement) {
            return coworking.reviews
                ? equipAverage(coworking.reviews) >= 3.75
                : null;
        }
        if (filteredState.Feeling) {
            return coworking.reviews
                ? feelingAverage(coworking.reviews) >= 3.75
                : null;
        }
        if (filteredState.Food) {
            return coworking.reviews
                ? foodAverage(coworking.reviews) >= 3.75
                : null;
        }

        if (filteredState.Accès_handicapé && coworking.hasHandicap) {
            return true;
        }
        if (filteredState.Parking && coworking.hasParking) {
            return true;
        }
        if (filteredState.Wifi && coworking.hasWiFi) {
            return true;
        }
        if (filteredState.Call_friendly && coworking.hasPrivacy) {
            return true;
        }
        if (filteredState.Extérieur && coworking.hasExterior) {
            return true;
        }
        if (filteredState.Prises_électriques && coworking.hasPlugs) {
            return true;
        }
        if (filteredState.Restauration && coworking.lunchPossibility) {
            return true;
        }
        // Ajoutez d'autres conditions ici pour d'autres types de lieux
        return false;
    });

    return (
        <div className='flex flex-col gap-8 lg:gap-12'>
            <h1 className='font-signatra text-3xl'>{citySelected}</h1>
            <div className='relative flex w-full flex-col gap-[20px] lg:flex-row'>
                <SideBarFilter />
                <div className='relative hidden h-[400px] w-full  lg:block lg:h-[700px] lg:w-[72%]'>
                    <Map
                        height='700px'
                        width='100%'
                        centerOfMap={cityCenterCoords}
                        coworkingLocations={coworkingLocations}
                        zoom={12}
                        coworkings={filteredCoworkings}
                    />
                </div>
            </div>
            <div className='flex w-full flex-wrap justify-between gap-8 p-4'>
                {filteredCoworkings.map((coworking) => (
                    <CoworkingCard
                        city={city}
                        coworking={coworking}
                        key={coworking.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayFilteredCoworking;
