'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/useRedux';
import { useRouter } from 'next/navigation';

const CitySearchButton = () => {
    const citySelected = useAppSelector(
        (state) => state.citySearch.selectedCity,
    );
    const router = useRouter();

    return (
        <>
            <Button
                variant={'default'}
                size={'sm'}
                className='flex w-full gap-2 sm:gap-6 sm:py-4 lg:block lg:w-auto lg:py-3 2xl:px-6 2xl:py-3'
                onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => {
                    e.preventDefault();
                    router.push(`/explore/${citySelected}`);
                }}
            >
                <span className='sm:text-xl lg:hidden'>Recherchez</span>
                <Image
                    src={'/search-refraction.svg'}
                    alt='search'
                    width={20}
                    height={20}
                    className='pointer-events-none lg:h-[20px] lg:w-[20px] 2xl:h-[26px] 2xl:w-[26px]'
                />
            </Button>
        </>
    );
};

export default CitySearchButton;
