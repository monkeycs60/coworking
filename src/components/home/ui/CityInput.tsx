'use client';

import { useRef, useState, useEffect } from 'react';

interface City {
    city: string;
}

interface CityInputProps {
    cities: City[];
}

const CityInput = ({ cities }: CityInputProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);

    const sortedCities = () => {
const frequency: Record<string, number> = {};
        for (const cityObj of cities) {
            const city = cityObj.city;
            if (!frequency[city]) {
                frequency[city] = 1;
            } else {
                frequency[city]++;
            }
        }

        return Object.keys(frequency)
            .sort((a, b) => frequency[b] - frequency[a])
            .map((city) => ({ city, count: frequency[city] }));
    };
    return (
        <div>
            <input
                type='text'
                placeholder='Entrez une ville'
                className='w-full rounded-xl border-2 border-gray-500 px-4 py-2 indent-8 sm:py-4 sm:indent-12 sm:text-xl lg:w-auto lg:px-20 lg:py-2 lg:indent-0 lg:text-lg 2xl:px-28 2xl:py-3'
                onClick={() => setShowDropdown(!showDropdown)}
                ref={inputRef}
            />
            {showDropdown && (
                <div className='absolute mt-1 w-full rounded-xl border bg-gray-300'>
                    {sortedCities().map((cityObj) => (
                        <div
                            key={cityObj.city}
                            className='p-2 hover:bg-gray-200'
                        >
                            {cityObj.city} ({cityObj.count})
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CityInput;
