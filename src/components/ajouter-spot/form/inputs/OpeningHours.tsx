import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OpeningHoursInput from './OpeningHoursInput';
import useOpeningHours from '@/hooks/useOpeningHours';
import { PlaceDetail } from '@/types/placeDetails';
import { FieldErrors } from 'react-hook-form';
import { daysOfWeek } from '@/lib/const/daysOfWeek';

interface OpeningHoursProps {
    placeDetails: PlaceDetail;
    errors: any;
}

const OpeningHours = ({ placeDetails, errors }: OpeningHoursProps) => {
    const [showDays, setShowDays] = useState(false);
    const openingTableForWeek = useOpeningHours(placeDetails);
    console.log('openingTableForWeek', errors);

    return (
        <div className='flex w-full flex-col gap-2'>
            <label className='font-bold' htmlFor='placeHours'>
                Horaires d'ouverture
            </label>
            <Button
                type='button'
                size={'specialButton'}
                variant={showDays ? 'secondaryReverse' : 'secondary'}
                onClick={() => setShowDays(!showDays)}
            >
                {showDays
                    ? 'Cacher les jours de la semaine'
                    : 'Afficher les jours de la semaine'}
            </Button>
            {showDays &&
                openingTableForWeek.map(({ open, close }, index) => (
                    <OpeningHoursInput
                        key={index}
                        day={daysOfWeek[index]}
                        index={index}
                        openTime={open}
                        closeTime={close}
                        errors={errors}
                    />
                ))}
        </div>
    );
};

export default OpeningHours;
