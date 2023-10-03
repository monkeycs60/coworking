'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toggleValue, FilterState } from '@/redux/features/filter-slice';

interface MobileFilterProps {
    FACILITY_TYPES: string[];
    STRENGTH: string[];
    FEATURES: string[];
}

const DesktopFilter = ({
    FACILITY_TYPES,
    STRENGTH,
    FEATURES,
}: MobileFilterProps) => {
    const dispatch = useAppDispatch();

    const filterState = useAppSelector((state) => state.filter);

    const handleClick = (type: keyof FilterState) => {
        dispatch(toggleValue(type));
    };

    return (
        <div className='hidden flex-col gap-8 lg:flex'>
            <div className='flex items-center justify-center gap-6 px-4 lg:hidden'>
                <h2 className='text-lg font-bold lg:text-xl'>Filtres</h2>
            </div>

            <>
                <div className='flex flex-col gap-4'>
                    <h3 className='font-semibold'>Type d'établissement</h3>
                    <div className='flex flex-wrap gap-6'>
                        {FACILITY_TYPES.map((type) => (
                            <button
                                className={`rounded-xl p-3 ${
                                    filterState[type as keyof FilterState]
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white'
                                }`}
                                key={type}
                                onClick={() =>
                                    handleClick(type as keyof FilterState)
                                }
                            >
                                {type.replace('_', '-')}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h3 className='font-semibold'>Point Fort</h3>
                    <div className='flex flex-wrap gap-6'>
                        {STRENGTH.map((type) => (
                            <button
                                className={`rounded-xl p-3 ${
                                    filterState[type as keyof FilterState]
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white'
                                }`}
                                key={type}
                                onClick={() =>
                                    handleClick(type as keyof FilterState)
                                }
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h3 className='font-semibold'>Fonctionnalités</h3>
                    <div className='flex flex-wrap gap-4'>
                        {FEATURES.map((feature) => (
                            <div
                                key={feature}
                                className='flex items-center justify-between gap-2'
                            >
                                <input
                                    type='checkbox'
                                    id={feature}
                                    onClick={() =>
                                        handleClick(
                                            feature as keyof FilterState,
                                        )
                                    }
                                />
                                <label htmlFor={feature}>
                                    {feature.replace('_', ' ')}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </div>
    );
};

export default DesktopFilter;
