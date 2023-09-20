'use client';

import { useState, useRef, useEffect } from 'react';
import { useFetchAutocomplete } from '@/hooks/useFetchAutocomplete';
import { useFetchPlaceDetails } from '@/hooks/useFetchPlaceDetails';
import { Place } from '@/types/placePredictions';

interface ComboBoxProps {
    onSelect: (place: Place) => void;
}

export function ComboBox({ onSelect }: ComboBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    const { inputField, predictions, setInput } = useFetchAutocomplete();
    const placeDetails = useFetchPlaceDetails(selectedPlace);

    const handleSelect = (place: Place) => {
        setIsOpen(false);
        setSelectedPlace(place.value);
        onSelect(place);
    };

    // when you click outside the input
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [inputRef]);

    return (
        <div ref={inputRef} className='relative z-[60]'>
            <input
                type='text'
                value={inputField}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsOpen(true)}
                placeholder='Rechercher un lieu...'
                className='z-[60] h-14 w-72 rounded-xl border border-gray-300 bg-white pl-3 pr-10 shadow-sm placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-indigo-500 '
            />
            {isOpen && (
                <ul
                    style={{
                        position: 'absolute',
                        width: '288px',
                        maxHeight: '260px',
                        overflowY: 'scroll',
                        marginTop: '1px',
                        listStyle: 'none',
                        padding: 0,
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
                        zIndex: 60,
                    }}
                >
                    {predictions.map((place, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                handleSelect(place);
                                setInput(place.label);
                            }}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                backgroundColor:
                                    inputField === place.label
                                        ? '#f0f0f0'
                                        : 'white',
                            }}
                        >
                            {place.label}
                        </li>
                    ))}
                    {predictions.length === 0 && (
                        <li
                            style={{ padding: '10px', zIndex: 60 }}
                            className='bg-gray-100'
                        >
                            Aucun lieu ne correspond à ta recherche
                        </li>
                    )}
                </ul>
            )}
            <span className='mt-1 block text-xs'>Ex. Starbucks Bordeaux</span>
        </div>
    );
}
