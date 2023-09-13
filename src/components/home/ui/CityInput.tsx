'use client';

import useSearchCity from '@/hooks/useSearchCity';
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

const CityInput = ({ cities }: CityInputProps) => {
    const {
        sortedCities,
        showDropdown,
        setShowDropdown,
        inputRef,
        dropdownRef,
        inputValue,
        dispatch,
        setInputSearch,
        setSelectedCity,
    } = useSearchCity();

    return (
        <div className='2xl:w-[100%]'>
            <input
                type='text'
                placeholder='Entrez une ville'
                className='w-full rounded-xl border-2 border-gray-500 px-4 py-2 indent-8 sm:py-4 sm:indent-12 sm:text-xl lg:w-auto lg:px-20 lg:py-2 lg:indent-0 lg:text-lg 2xl:px-28 2xl:py-3'
                onClick={() => setShowDropdown(!showDropdown)}
                onChange={(e) => dispatch(setInputSearch(e.target.value))}
                ref={inputRef}
                value={inputValue}
            />
            {showDropdown && (
                <div
                    className='absolute z-40 mt-[1px] max-h-[22vh] w-full overflow-y-auto rounded-xl border bg-gray-300 pl-2 lg:top-auto lg:h-80 lg:w-[83%]'
                    ref={dropdownRef}
                >
                    {sortedCities({ cities }).map((cityObj) => (
                        <div
                            key={cityObj.city}
                            className='p-2 hover:bg-gray-200'
                            onClick={() => {
                                dispatch(setSelectedCity(cityObj.city));
                                dispatch(setInputSearch(cityObj.city));
                                inputRef.current?.blur();
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
