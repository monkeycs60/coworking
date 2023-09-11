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
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
            .map((city) => ({ city, count: frequency[city] }))
            .filter((cityObj) =>
                cityObj.city.toLowerCase().includes(inputValue.toLowerCase()),
            );
    };

    return (
        <div className='w-[100%]'>
            <input
                type='text'
                placeholder='Entrez une ville'
                className='w-full rounded-xl border-2 border-gray-500 px-4 py-2 indent-8 sm:py-4 sm:indent-12 sm:text-xl lg:w-auto lg:px-20 lg:py-2 lg:indent-0 lg:text-lg 2xl:px-28 2xl:py-3'
                onClick={() => setShowDropdown(!showDropdown)}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputRef}
                value={inputValue}
            />
            {showDropdown && (
                <div
                    className='absolute top-[-165px] mt-[1px] h-[18vh] w-full overflow-y-auto rounded-xl border bg-gray-300 pl-2 lg:top-auto lg:h-80 lg:w-[83%]'
                    ref={dropdownRef}
                >
                    {sortedCities().map((cityObj) => (
                        <div
                            key={cityObj.city}
                            className='p-2 hover:bg-gray-200'
                            onClick={() => {
                                setInputValue(cityObj.city);
                                setShowDropdown(false);
                            }}
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
