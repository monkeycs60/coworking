import { ChevronDown, ChevronUp } from 'lucide-react';

interface MobileFilterProps {
    isFilterOpen: boolean;
    setIsFilterOpen: (isFilterOpen: boolean) => void;
    FACILITY_TYPES: string[];
    STRENGTH: string[];
    FEATURES: string[];
}

const MobileFilter = ({
    isFilterOpen,
    setIsFilterOpen,
    FACILITY_TYPES,
    STRENGTH,
    FEATURES,
}: MobileFilterProps) => {
    return (
        <div className='flex flex-col gap-8 lg:hidden'>
            <div
                className='flex items-center justify-center gap-6 px-4 lg:hidden'
                onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
                <h2 className='text-lg font-bold lg:text-xl'>Filtres</h2>
                {isFilterOpen ? (
                    <ChevronUp className='h-6 w-6' />
                ) : (
                    <ChevronDown className='h-6 w-6' />
                )}
            </div>

            {isFilterOpen ? (
                <>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-semibold'>Type d'établissement</h3>
                        <div className='flex flex-wrap gap-6'>
                            {FACILITY_TYPES.map((type) => (
                                <button
                                    className='rounded-xl bg-white p-3'
                                    key={type}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-semibold'>Point Fort</h3>
                        <div className='flex flex-wrap gap-6'>
                            {STRENGTH.map((type) => (
                                <button
                                    className='rounded-xl bg-white p-3'
                                    key={type}
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
                                    <input type='checkbox' id={feature} />
                                    <label htmlFor={feature}>{feature}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default MobileFilter;
