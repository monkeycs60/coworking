'use client';

import useSearchCity from '@/hooks/useSearchCity';
import { Search } from 'lucide-react';
import {
    setSelectedCity,
    setInputSearch,
} from '@/redux/features/citySearch-slice';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/useRedux';
import { useRouter } from 'next/navigation';

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

    const citySelected = useAppSelector(
        (state) => state.citySearch.selectedCity,
    );

    const router = useRouter();


    return (
        <div className='relative m-auto flex w-[55%] flex-col items-center justify-center text-black lg:mt-16 lg:h-[60px] 3xl:mt-32 3xl:h-[70px]'>
            <Search className='absolute left-4 z-[50] text-black ' />
            <input
                type='text'
                placeholder='Chercher une ville où coworker gratuitement'
                className='absolute h-full w-full rounded-full pl-16 lg:py-2 lg:indent-0 lg:text-lg lg:placeholder:text-base 2xl:py-3  3xl:placeholder:text-lg'
                onClick={() => setShowDropdown(!showDropdown)}
                onChange={(e) => dispatch(setInputSearch(e.target.value))}
                ref={inputRef}
                value={inputValue}
            />
            {showDropdown && (
                <div
                    className='absolute top-[61px] z-40 max-h-80 w-[97%]  overflow-y-auto rounded-xl border bg-gray-300 pl-2 3xl:top-[72px]  '
                    ref={dropdownRef}
                >
                    {sortedCities({ cities }).map((cityObj) => (
                        <div
                            key={cityObj.city}
                            className='cursor-pointer p-2 hover:bg-gray-200'
                            onClick={() => {
                                dispatch(setSelectedCity(cityObj.city));
                                dispatch(setInputSearch(cityObj.city));
                                inputRef.current?.blur();
                                setShowDropdown(false);
                            }}
                        >
                            {cityObj.city} -  {cityObj.count} lieu{cityObj.count > 1 ? "x" : ""} où coworker gratuitement
                        </div>
                    ))}
                </div>
            )}
            <Button variant="default" className='absolute right-2 px-12 py-6 font-normal 3xl:px-16 3xl:py-7 3xl:text-lg' onClick={(
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) => {
                e.preventDefault();
                router.push(`/explore/${citySelected}`);
            }} >
                <Link href='/city'>
                    Rechercher
                </Link>
            </Button>
        </div>
    );
};

export default CityInput;
