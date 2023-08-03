'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
	SignOutButton,
	useAuth,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';

interface HamburgerProps {
	isHamburgerOpen: boolean;
	toggleHamburgerMenu: () => void;
}
const Hamburger = ({
	isHamburgerOpen,
	toggleHamburgerMenu,
}: HamburgerProps) => {
	const { userId } = useAuth();

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
			className='fixed left-0 top-0 z-[100] h-screen w-screen overflow-hidden bg-white font-inter'>
			<div className=' flex h-full flex-col  justify-center p-12 text-center text-lg font-semibold '>
				<div className='flex flex-col gap-6'>
					<Link
						href={'/about'}
						className='linkHoverEffect'
						onClick={toggleHamburgerMenu}>
						A propos
					</Link>
					<Link
						href={'/'}
						className='linkHoverEffect'
						onClick={toggleHamburgerMenu}>
						FAQ
					</Link>
					<Link
						href={'/coworking-list'}
						className='linkHoverEffect'
						onClick={toggleHamburgerMenu}>
						Explorer
					</Link>
					<Link
						href={'/add-coworking'}
						className='linkHoverEffect'
						onClick={toggleHamburgerMenu}>
						Ajouter un spot
					</Link>
				</div>

				{userId ? (
					<div className='hamburger-connect-shadow bg mt-24 flex flex-col items-center gap-4 p-6 shadow-xl drop-shadow-xl'>
						<div className='flex gap-2'>
							<p>Profil :</p>
							<UserButton />
						</div>
						<SignOutButton>
							<div className='linkHoverEffect'>
								<span>Se déconnecter</span>
							</div>
						</SignOutButton>
					</div>
				) : (
					<div className='hamburger-connect-shadow bg mt-24 flex flex-col gap-4 p-6 shadow-xl drop-shadow-xl'>
						<SignInButton>
							<div className='linkHoverEffect'>
								<span>Se connecter</span>
							</div>
						</SignInButton>

						<SignUpButton>
							<div className='linkHoverEffect'>
								<span>S&apos;inscrire</span>
							</div>
						</SignUpButton>
					</div>
				)}
			</div>
			<X
				size={40}
				className='absolute right-3 top-4'
				onClick={toggleHamburgerMenu}
			/>
		</motion.section>
	);
};

export default Hamburger;
