'use client';

import SignInButtonLogic from '../auth/SignInButtonLogic';
import { SignOutButton, UserButton, useAuth } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import SignUpButtonLogic from '../auth/SignUpButtonLogic';
import { Menu } from 'lucide-react';
import useScrollPosition from '@/hooks/useScrollPosition';

function NavBar() {
	const { userId } = useAuth();
	const scrollPosition = useScrollPosition();

	return (
		<div
			className={`fixed z-10 mt-4 flex w-full justify-between  gap-10 py-2 lg:w-[1200px]
			${scrollPosition > 50 ? 'bg-white' : ''}`}>
			<div className='flex w-full items-center justify-between px-4 lg:w-auto lg:justify-center lg:gap-14 lg:px-0'>
				<Link href={'/'} className='flex items-center justify-center gap-4'>
					<Image
						src={'/logo-cowork-v1-nobg.png'}
						alt='logo'
						width={40}
						height={40}
					/>
					<h1 className='font-telma text-xl font-semibold first-letter:text-primary'>
						Coworkez{' '}
						<span className='first-letter:text-secondary lg:block'>
							Malin
						</span>{' '}
					</h1>
				</Link>
				<ul className='hidden items-center justify-center gap-6 font-semibold lg:flex'>
					<li className='linkHoverEffect'>
						<Link href={'/about'}>A propos</Link>
					</li>
					<li className='linkHoverEffect'>
						<Link href={'/faq'}>FAQ</Link>
					</li>
					<li className='linkHoverEffect'>
						<Link href={'/coworking-list'}>Explorer</Link>
					</li>
					<li className='linkHoverEffect'>
						<Link href={'/add-coworking'}>Ajouter un spot</Link>
					</li>
				</ul>
				<div className='block lg:hidden'>
					<Menu className='text-primary' />
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
	);
}

export default NavBar;
