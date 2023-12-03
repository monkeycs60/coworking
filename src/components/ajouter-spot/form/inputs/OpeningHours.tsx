'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { daysOfWeek } from '@/lib/const/daysOfWeek';
import { getTimeFromDay } from '@/lib/functions/getTimeFromDay';
import { PlaceDetail } from '@/types/placeDetails';
import { Button } from '@/components/ui/button';

interface OpeningHoursProps {
    placeDetails: PlaceDetail;
    errors: any;
}

const OpeningHours = ({ placeDetails, errors }: OpeningHoursProps) => {
    const { register } = useFormContext(); 

    const [showDays, setShowDays] = useState(false);

    const OpeningHourInput = ({
        day,
        index,
        defaultValue,
    }: {
        day: string;
        index: number;
        defaultValue: string;
    }) => (
        <div key={index} className='mt-2'>
            <label
                htmlFor={`openingHours.${index}`}
                className='block text-sm font-medium text-gray-700'
            >
                {day}
            </label>
            <input
                {...register(`openingHours.${index}`)}
                id={`openingHours.${index}`}
                name={`openingHours.${index}`}
                className='mt-1 w-full rounded-xl bg-gray-100 p-4'
                type='text'
                defaultValue={getTimeFromDay(defaultValue)}
            />
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
                Horaires d&apos;ouverture
            </label>
            <Button
                size={'specialButton'}
                variant={showDays ? 'secondaryReverse' : 'secondary'}
                onClick={() => setShowDays(!showDays)}
            >
                {showDays
                    ? 'Cacher les jours de la semaine'
                    : 'Afficher les jours de la semaine'}
            </Button>
            {showDays && // Seulement afficher si `showDays` est vrai
                (placeDetails.current_opening_hours &&
                placeDetails.current_opening_hours.weekday_text
                    ? placeDetails.current_opening_hours.weekday_text.map(
                          (day: string, index: number) => {
                              const dayName = day.split(':')[0];
                              return (
                                  <OpeningHourInput
                                      key={index}
                                      day={dayName}
                                      index={index}
                                      defaultValue={day.split(':')[1]?.trim()}
                                  />
                              );
                          },
                      )
                    : daysOfWeek.map((day, index) => (
                          <OpeningHourInput
                              key={index}
                              day={day}
                              index={index}
                              defaultValue=''
                          />
                      )))}
        </div>
    );
};

export default OpeningHours;
