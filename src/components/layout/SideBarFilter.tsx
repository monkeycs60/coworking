'use client';

import React, { CSSProperties, useState } from 'react';
import MobileFilter from './SideBarFilter/MobileFilter';
import DesktopFilter from './SideBarFilter/DesktopFilter';
import {
    FACILITY_TYPES,
    FEATURES,
    STRENGTH,
} from '@/lib/const/filterCategories';

interface SideBarFilterProps {
    containerClassName?: CSSProperties;
}

const SideBarFilter = ({ containerClassName }: SideBarFilterProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    return (
        <div
            className={`flex h-auto w-full flex-col gap-4 rounded-xl bg-gray-200 p-4 lg:h-[700px] lg:w-[28%] ${containerClassName}`}
        >
            <MobileFilter
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                FACILITY_TYPES={FACILITY_TYPES}
                STRENGTH={STRENGTH}
                FEATURES={FEATURES}
            />
            <DesktopFilter
                FACILITY_TYPES={FACILITY_TYPES}
                STRENGTH={STRENGTH}
                FEATURES={FEATURES}
            />
        </div>
    );
};

export default SideBarFilter;
