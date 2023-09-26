'use client';

import { useState, useEffect } from 'react';

const useWindowWidth = (): number => {
    // Définissez un état pour la largeur de la fenêtre
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        // Mettez à jour la largeur de la fenêtre lors d'un redimensionnement
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // Supprimez l'event listener lors du nettoyage
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowWidth;
};

const MOBILE_MAX_WIDTH = 768; // Vous pouvez ajuster cette valeur selon vos besoins

const useResponsiveWidth = (): string => {
    const windowWidth = useWindowWidth();

    let definitiveWidth = '0';

    if (windowWidth <= MOBILE_MAX_WIDTH) {
        definitiveWidth = '200px'; // ou la largeur que vous voulez pour mobile
    }
    return definitiveWidth; // ou la largeur que vous voulez pour desktop
};

export default useResponsiveWidth;
