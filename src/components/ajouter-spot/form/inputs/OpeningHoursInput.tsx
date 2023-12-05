import React from 'react';
import { useFormContext } from 'react-hook-form';
import { formatTimeInput } from '@/lib/functions/formatTimeInput';
import { FieldErrors } from 'react-hook-form';


interface OpeningHourInputProps {
    day: string;
    index: number;
    openTime: string;
    closeTime: string;
    errors: FieldErrors<any>; 
}

const OpeningHoursInput = ({
    day,
    index,
    openTime,
    closeTime,
    errors,
}: OpeningHourInputProps) => {
    const { register } = useFormContext();

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
                    defaultValue={formatTimeInput(openTime)}
                    placeholder="Heure d'ouverture"
                />
                <input
                    {...register(`openingHours.${index}.close`)}
                    id={`openingHours.${index}.close`}
                    name={`openingHours.${index}.close`}
                    className='mt-1 w-1/2 rounded-xl bg-gray-100 p-4'
                    type='text'
                    defaultValue={formatTimeInput(closeTime)}
                    placeholder='Heure de fermeture'
                />
            </div>
            {errors[`openingHours.${index}`] && (
                <p className='text-xs italic text-red-600'>
                    Veuillez entrer un horaire valide
                </p>
            )}
        </div>
    );
};

export default OpeningHoursInput;
