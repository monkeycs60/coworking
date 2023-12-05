import React from 'react';
import { useFormContext } from 'react-hook-form';
import { formatTimeInput } from '@/lib/functions/formatTimeInput';
import { FieldErrors } from 'react-hook-form';

interface OpeningHourInputProps {
    day: string;
    index: number;
    openTime: {
        day: number;
        time: string;
    };
    closeTime: {
        day: number;
        time: string;
    };
    errors: any;
}

const OpeningHoursInput = ({
    day,
    index,
    openTime,
    closeTime,
    errors,
}: OpeningHourInputProps) => {
    const { register } = useFormContext();

    console.log(errors.openingHours[0].open);

    if (errors && errors.open) console.log(errors);

    return (
        <div className='mt-2'>
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
                    defaultValue={formatTimeInput(openTime.time)}
                    placeholder="Heure d'ouverture"
                />

                <input
                    {...register(`openingHours.${index}.close`)}
                    id={`openingHours.${index}.close`}
                    name={`openingHours.${index}.close`}
                    className='mt-1 w-1/2 rounded-xl bg-gray-100 p-4'
                    type='text'
                    defaultValue={formatTimeInput(closeTime.time)}
                    placeholder='Heure de fermeture'
                />
            </div>
        </div>
    );
};

export default OpeningHoursInput;
