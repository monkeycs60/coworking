'use client';

import React, { CSSProperties, useState } from 'react';
import MobileFilter from './SideBarFilter/MobileFilter';
import DesktopFilter from './SideBarFilter/DesktopFilter';

interface SideBarFilterProps {
    containerClassName?: CSSProperties;
}

const FACILITY_TYPES = ['Café', 'Hôtel', 'Bibliothèque', 'Tiers-lieu', 'Autre'];
const STRENGTH = ['Calme', 'Equipement', 'Food', 'Feeling'];
const FEATURES = [
    'Wifi',
    'Parking',
    'Call Friendly',
    'Prises électriques',
    'Accès handicapé',
    'Extérieur',
    'Restauration',
];

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
