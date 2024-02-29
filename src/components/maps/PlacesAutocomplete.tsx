'use client';

import { usePlaceDetailsStore } from '@/zustand/stores/placeDetailsStore';
import AddPlace from '../ajouter-spot/AddPlace';
import { ComboBox } from '../ui/combobox';

const PlacesAutocomplete = () => {
    const placeDetails = usePlaceDetailsStore((state) => state.details);

    return (
        <div className='m-auto w-full'>
            {placeDetails ? (
                <AddPlace />
            ) : (
                <ComboBox onSelect={(place) => console.log(place)} />
            )}
        </div>
    );
};

export default PlacesAutocomplete;
