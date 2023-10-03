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

        let isValid = true;

        if (filteredState.Café) {
            isValid = isValid && coworking.facility === 'IS_CAFE';
        }
        if (filteredState.Hôtel) {
            isValid = isValid && coworking.facility === 'IS_HOTEL';
        }
        if (filteredState.Bibliothèque) {
            isValid = isValid && coworking.facility === 'IS_LIBRARY';
        }
        if (filteredState.Tiers_lieu) {
            isValid = isValid && coworking.facility === 'IS_THIRD_SPACE';
        }
        if (filteredState.Autre) {
            isValid = isValid && coworking.facility === 'IS_OTHER_TYPE';
        }
        if (filteredState.Calme) {
            isValid =
                isValid && coworking.reviews
                    ? calmAverage(coworking.reviews) >= 3.75
                    : false;
        }
        if (filteredState.Equipement) {
            isValid =
                isValid && coworking.reviews
                    ? equipAverage(coworking.reviews) >= 3.75
                    : false;
        }
        if (filteredState.Feeling) {
            isValid =
                isValid && coworking.reviews
                    ? feelingAverage(coworking.reviews) >= 3.75
                    : false;
        }
        if (filteredState.Food) {
            isValid =
                isValid && coworking.reviews
                    ? foodAverage(coworking.reviews) >= 3.75
                    : false;
        }

        if (filteredState.Accès_handicapé) {
            isValid = isValid && coworking.hasHandicap;
        }
        if (filteredState.Parking) {
            isValid = isValid && coworking.hasParking;
        }
        if (filteredState.Wifi) {
            isValid = isValid && coworking.hasWiFi;
        }
        if (filteredState.Call_friendly) {
            isValid = isValid && coworking.hasPrivacy;
        }
        if (filteredState.Extérieur) {
            isValid = isValid && coworking.hasExterior;
        }
        if (filteredState.Prises_électriques) {
            isValid = isValid && coworking.hasPlugs;
        }
        if (filteredState.Restauration) {
            isValid =
                (isValid && coworking.lunchPossibility) ||
                (isValid && coworking.snacksPossibility);
        }
        // Ajoutez d'autres conditions ici pour d'autres types de lieux
        return isValid;
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
