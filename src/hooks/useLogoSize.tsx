'use client';

type useLogoSizeProps = {
    logoClass: string;
};

import { useState, useEffect } from 'react';

function useLogoSize(scrollY: number): useLogoSizeProps {
    const [logoClass, setlogoClass] = useState('');

    useEffect(() => {
        if (scrollY > 50) {
            setlogoClass('lg:scale-[85%]');
        } else {
            setlogoClass('');
        }
    }, [scrollY]);

    return {
        logoClass,
    };
}

export default useLogoSize;
