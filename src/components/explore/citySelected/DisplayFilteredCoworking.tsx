'use client';

import SideBarFilter from '@/components/layout/SideBarFilter';
import Map from '@/components/explore/Map';
import CoworkingCard from '@/components/explore/cards/CoworkingCard';
import { Coworking } from '@/types/coworking';
import {  useAppSelector } from '@/hooks/useRedux';
import { filterCoworkings } from '@/lib/functions/filterCoworkings';

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
    const filteredState = useAppSelector((state) => state.filter);
    const filteredCoworkings = filterCoworkings(coworkings, filteredState);

    return (
        <div className='flex flex-col gap-8 lg:gap-12'>
            <h1 className='text-3xl'>{citySelected}</h1>
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
