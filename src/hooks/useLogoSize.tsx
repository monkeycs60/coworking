'use client';

type UseLogoSizeReturn = {
    logoClass: string;
};

import { useState, useEffect } from 'react';

function useLogoSize(scrollY: number): UseLogoSizeReturn {
    const [logoClass, setLogoClass] = useState('');

    useEffect(() => {
        let initialClass = 'w-[230px]'; // valeur par défaut pour les écrans "moyens" (juste un exemple)

        if (window.innerWidth >= 1980) {
            initialClass = 'w-[270px]'; // valeur plus grande pour les grands écrans
        }

        if (scrollY > 50) {
            setLogoClass(`${initialClass} scale-75`); // réduit de 75%
        } else {
            setLogoClass(initialClass);
        }
    }, [scrollY]);

    return {
        logoClass,
    };
}

export default useLogoSize;
