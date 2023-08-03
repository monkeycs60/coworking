import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import SignInButtonLogic from '../auth/SignInButtonLogic';
import SignUpButtonLogic from '../auth/SignUpButtonLogic';

interface HamburgerProps {
	isHamburgerOpen: boolean;
	toggleHamburgerMenu: () => void;
}
const Hamburger = ({
	isHamburgerOpen,
	toggleHamburgerMenu,
}: HamburgerProps) => {
	const variants = {
		open: { opacity: 1, y: 0 },
		closed: { opacity: 0, y: '100%' },
		exit: { opacity: 0, y: '100%' },
	};
	return (
		<motion.section
			initial='closed'
			animate={isHamburgerOpen ? 'open' : 'closed'}
			exit='exit'
			variants={variants}
			transition={{ duration: 0.5 }}
			className='absolute left-0 top-0 z-[100] h-screen w-screen overflow-hidden bg-blue-300'>
			<div className='hamburger'>
				<div className='line'>
					<p className='p-12'>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						Ducimus illo tempore quae reprehenderit deserunt sit, mollitia
						ipsa quod neque adipisci.
					</p>
				</div>
				<SignInButtonLogic />
				<SignUpButtonLogic />
				<div className='line'></div>
			</div>
			<X
				size={44}
				className='absolute bottom-32 left-1/2 -translate-x-1/2'
				onClick={toggleHamburgerMenu}
			/>
		</motion.section>
	);
};

export default Hamburger;
