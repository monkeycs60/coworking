'use client';

import React, { useEffect } from 'react';
import { TreeDeciduous } from 'lucide-react';
import {
    Experience,
    MusicLevel,
    WorkComfort,
    InternetQuality,
    WorkspaceComposition,
    HasToCall,
    DrinksAndFood,
} from '@/redux/features/placeDetails-slice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
    setMusicLevel,
    setInternetQuality,
    setDrinksAndFood,
    setHasToCall,
    setWorkspaceComposition,
    setWorkComfort,
} from '@/redux/features/placeDetails-slice';
import { useFormContext } from 'react-hook-form';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';

type ExperienceValue =
    | MusicLevel
    | WorkComfort
    | InternetQuality
    | WorkspaceComposition
    | HasToCall
    | DrinksAndFood;

interface MultipleChoiceButtonProps {
    name: keyof Experience;
    value: string;
    label: string;
    svg?: React.ReactNode;
    maxChoices: number;
}

const MultipleChoice = ({
    name,
    value,
    label,
    maxChoices,
    svg,
}: MultipleChoiceButtonProps) => {
    const { experience, updateStep } = useAddCoworkingStore();
    console.log('experience', experience);

    const { control, setValue } = useFormContext();

    useEffect(() => {
        (Object.keys(experience) as Array<keyof Experience>).forEach((key) => {
            setValue(key, experience[key]);
        });
    }, [experience, setValue]);

    const isSelected = experience[name]?.includes(value as never) || false;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Assuming `name` corresponds to one of the keys in the Experience type.
        const experienceArray = experience[name];

        // First, ensure that `experienceArray` is indeed an array.
        if (!Array.isArray(experienceArray)) {
            console.error(
                `Expected an array for experience['${name}'], but got:`,
                experienceArray,
            );
            return;
        }

        // Now TypeScript knows that `experienceArray` is an array, and we can call `filter`.
        const updatedValues: ExperienceValue[] = isSelected
            ? (experience[name] as ExperienceValue[]).filter(
                  (item) => item !== value,
              )
            : ([
                  ...(experience[name] as ExperienceValue[]),
                  value,
              ] as ExperienceValue[]);

        console.log('updatedValues', updatedValues);

        if (updatedValues.length > maxChoices) {
            console.log('max choices reached');

            // retire la valeur la plus ancienne
            updatedValues.shift();

            // and add the new value
            // updatedValues.push(value);
        }

        switch (name) {
            case 'musicLevel':
                updateStep(3, {
                    musicLevel: updatedValues,
                } as Experience);
                break;
            case 'workComfort':
                updateStep(3, { workComfort: updatedValues } as Experience);
                break;
            case 'internetQuality':
                updateStep(3, { internetQuality: updatedValues } as Experience);
                break;
            case 'workspaceComposition':
                updateStep(3, {
                    workspaceComposition: updatedValues,
                } as Experience);
                break;
            case 'hasToCall':
                updateStep(3, { hasToCall: updatedValues } as Experience);
                break;
            case 'drinksAndFood':
                updateStep(3, { drinksAndFood: updatedValues } as Experience);
                break;
        }
    };

    const buttonStyle = isSelected ? { backgroundColor: 'blue' } : {};

    return (
        <label style={buttonStyle}>
            <input
                type='checkbox'
                value={value}
                checked={isSelected}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            <div>
                {svg || <TreeDeciduous />}
                {label}
            </div>
        </label>
    );
};

export default MultipleChoice;
