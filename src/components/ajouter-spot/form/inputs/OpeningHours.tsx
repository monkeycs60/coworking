'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OpeningHoursInput from './OpeningHoursInput';
import useOpeningHours from '@/hooks/useOpeningHours';
import { PlaceDetail } from '@/types/placeDetails';
import { FieldErrors } from 'react-hook-form';
import { daysOfWeek } from '@/lib/const/daysOfWeek';
import { useFormContext } from 'react-hook-form';

const OpeningHours = () => {
    const [showDays, setShowDays] = useState(false);
    const openingTableForWeek = useOpeningHours();

    const {
        formState: { errors },
    } = useFormContext<PlaceDetail>();

    return (
        <div className='flex w-full flex-col justify-center gap-2'>
            <label className='font-bold' htmlFor='placeHours'>
                Horaires d'ouverture
            </label>

            {openingTableForWeek.map(({ open, close }, index) => (
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
