'use client';

import SignInButtonLogic from '../auth/SignInButtonLogic';
import { SignOutButton, UserButton, useAuth } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import SignUpButtonLogic from '../auth/SignUpButtonLogic';
import { Menu } from 'lucide-react';
import useScrollPosition from '@/hooks/useScrollPosition';
import useHamburgerMenu from '@/hooks/useHamburgerMenu';
import Hamburger from './Hamburger';
import { AnimatePresence } from 'framer-motion';

function NavBar() {
	const { isHamburgerOpen, toggleHamburgerMenu } = useHamburgerMenu();
	const { userId } = useAuth();
	const scrollPosition = useScrollPosition();

	return (
		<>
			<AnimatePresence mode='wait'>
				{isHamburgerOpen && (
					<Hamburger
						isHamburgerOpen={isHamburgerOpen}
						toggleHamburgerMenu={toggleHamburgerMenu}
					/>
				)}
			</AnimatePresence>

			<div
				className={`z-30 mt-4 flex w-full justify-between gap-10  py-2 lg:fixed lg:w-[1200px]
			${scrollPosition > 50 ? 'bg-white' : ''}`}>
				<div className='flex w-full items-center justify-between px-4 lg:w-auto lg:justify-center lg:gap-14 lg:px-0'>
					<Link
						href={'/'}
						className='flex items-center justify-center gap-4 sm:gap-10'>
						<Image
							src={'/logo-cowork-v1-nobg.png'}
							alt='logo'
							width={40}
							height={40}
						/>
						<h1 className='font-telma text-xl font-semibold first-letter:text-primary sm:text-3xl'>
							Coworkez{' '}
							<span className='first-letter:text-secondary lg:block'>
								Malin
							</span>{' '}
						</h1>
					</Link>
					<ul className='hidden items-center justify-center gap-6 font-semibold lg:flex 2xl:text-lg'>
						<li className='linkHoverEffect'>
							<Link href={'/about'}>A propos</Link>
						</li>
						<li className='linkHoverEffect'>
							<Link href={'/faq'}>FAQ</Link>
						</li>
						<li className='linkHoverEffect'>
							<Link href={'/ajouter-spot'}>Explorer</Link>
						</li>
						<li className='linkHoverEffect'>
							<Link href={'/add-coworking'}>Ajouter un spot</Link>
						</li>
					</ul>
					<div className='block lg:hidden'>
						<Menu
							className='fixed right-6 top-8 z-50 text-primary sm:h-8 sm:w-8'
							onClick={toggleHamburgerMenu}
						/>
					</div>
				</div>
				<div className='hidden items-center justify-center gap-4 lg:flex'>
					{userId ? (
						<>
							<SignOutButton>
								<Button variant='outline'>Sign out</Button>
							</SignOutButton>
							<UserButton />
						</>
					) : (
						<>
							<SignInButtonLogic />
							<SignUpButtonLogic />
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default NavBar;
