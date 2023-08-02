import { useState, useEffect } from 'react';

const useHamburgerMenu = () => {
	const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);

	useEffect(() => {
		if (isHamburgerOpen) {
			document.body.style.overflowY = 'hidden';
			document.documentElement.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'unset';
			document.documentElement.style.overflowY = 'unset';
		}

		// Cleanup function
		return () => {
			document.body.style.overflowY = 'unset';
			document.documentElement.style.overflowY = 'unset';
		};
	}, [isHamburgerOpen]);

	const toggleHamburgerMenu = () => {
		setIsHamburgerOpen((prev) => !prev);
	};

	return { isHamburgerOpen, toggleHamburgerMenu };
};

export default useHamburgerMenu;
