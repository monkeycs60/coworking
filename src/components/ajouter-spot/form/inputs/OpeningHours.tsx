'use client';

import { useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { daysOfWeek } from '@/lib/const/daysOfWeek';
import { getTimeFromDay } from '@/lib/functions/getTimeFromDay';
import { formatTimeInput } from '@/lib/functions/formatTimeInput';
import { PlaceDetail } from '@/types/placeDetails';
import { Button } from '@/components/ui/button';
import { AddPlaceSchemaType } from '@/types/addPlace';

interface OpeningHoursProps {
    placeDetails: PlaceDetail;
    errors: FieldErrors<AddPlaceSchemaType>;
}

const OpeningHours = ({ placeDetails, errors }: OpeningHoursProps) => {
    const { register } = useFormContext();

    const [showDays, setShowDays] = useState(false);

    const openingTableForWeek = placeDetails?.current_opening_hours?.periods?.map(
        (period) => {
            const day = period.open.day;
            const open = period.open.time;
            const close = period.close.time;
            return { day, open, close };
        }
    );

    console.log('deal', openingTableForWeek);
    

    const OpeningHourInput = ({
    day,
    index,
    openTime,
    closeTime,
}: {
    day: string;
    index: number;
    openTime: string;
    closeTime: string;
}) => (
    <div key={index} className='mt-2'>
        <label
            htmlFor={`openingHours.${index}`}
            className='block text-sm font-medium text-gray-700'
        >
            {day}
        </label>
        <div className='flex gap-2'>
            <input
                {...register(`openingHours.${index}.open`)}
                id={`openingHours.${index}.open`}
                name={`openingHours.${index}.open`}
                className='mt-1 w-1/2 rounded-xl bg-gray-100 p-4'
                type='text'
                defaultValue={openTime}
                placeholder="Heure d'ouverture"
            />
            <input
                {...register(`openingHours.${index}.close`)}
                id={`openingHours.${index}.close`}
                name={`openingHours.${index}.close`}
                className='mt-1 w-1/2 rounded-xl bg-gray-100 p-4'
                type='text'
                defaultValue={closeTime}
                placeholder='Heure de fermeture'
            />
        </div>
        {(errors as unknown as { [key: string]: any })[
            `openingHours.${index}`
        ] && (
            <p className='text-xs italic text-red-600'>
                Veuillez entrer un horaire valide
            </p>
        )}
    </div>
);


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
                (openingTableForWeek && openingTableForWeek.length > 0
                    ? openingTableForWeek.map(({ day, open, close }, index) => (
                          <OpeningHourInput
                              key={index}
                              day={daysOfWeek[day]}
                              index={index}
                              openTime={formatTimeInput(open)}
                              closeTime={formatTimeInput(close)}
                          />
                      ))
                    : daysOfWeek.map((day, index) => (
                          <OpeningHourInput
                              key={index}
                              day={day}
                              index={index}
                              openTime=''
                              closeTime=''
                          />
                      )))}
        </div>
    );
};

export default OpeningHours;
