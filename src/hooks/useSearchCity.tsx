'use client';

import { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
    setSelectedCity,
    setInputSearch,
} from '@/redux/features/citySearch-slice';

interface City {
    city: string;
}

interface CityInputProps {
    cities: City[];
}

const useSearchCity = () => {
    const dispatch = useAppDispatch();
    const inputValue = useAppSelector((state) => state.citySearch.inputSearch);
    const [showDropdown, setShowDropdown] = useState(false);
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

    const sortedCities = ({ cities }: CityInputProps) => {
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

    return {
        sortedCities,
        showDropdown,
        setShowDropdown,
        inputRef,
        dropdownRef,
        inputValue,
        dispatch,
        setInputSearch,
        setSelectedCity,
    };
};

export default useSearchCity;
