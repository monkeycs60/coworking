'use client';

import { useState, useRef, useEffect } from 'react';
import { useFetchAutocomplete } from '@/hooks/useFetchAutocomplete';
import { useFetchStorePlaceDetails } from '@/hooks/useFetchStorePlaceDetails';
import { Place } from '@/types/placePredictions';
import { X } from 'lucide-react';

interface ComboBoxProps {
    onSelect: (place: Place) => void;
}

export function ComboBox({ onSelect }: ComboBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    const { input, predictions, setInput, resetAutocomplete } =
        useFetchAutocomplete();
    const placeDetails = useFetchStorePlaceDetails(selectedPlace);

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
        <div ref={inputRef} className='z-[60] w-full'>
            <span className='mt-2 mb-8 block text-sm text-primary font-bold'>
                Exemple : Starbucks Bordeaux (nom + ville)
            </span>
            <div className='relative'>
                <input
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder='Rechercher un lieu...'
                    className='z-[60] h-14 w-full rounded-xl border border-gray-300 bg-white pl-3 pr-10 shadow-sm placeholder:indent-6 placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-indigo-500 '
                />
                {input && (
                    <X
                        className='absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-black/50'
                        onClick={() => {
                            setIsOpen(false);
                            setSelectedPlace(null);
                            setInput('');
                            resetAutocomplete();
                        }}
                    />
                )}
            </div>
            {isOpen && (
                <ul
                    style={{
                        width: 'auto',
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
                                    input === place.label ? '#f0f0f0' : 'white',
                            }}
                        >
                            {place.label}
                        </li>
                    ))}
                    {predictions.length === 0 && (
                        <li
                            style={{
                                zIndex: 60,
                                padding: '10px',
                            }}
                            className='w-full bg-gray-100'
                        >
                            Aucun lieu ne correspond à ta recherche
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}
