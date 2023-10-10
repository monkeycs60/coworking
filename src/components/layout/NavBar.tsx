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
import useLogoSize from '@/hooks/useLogoSize';

function NavBar() {
    const { isHamburgerOpen, toggleHamburgerMenu } = useHamburgerMenu();
    const { userId } = useAuth();
    const scrollPosition = useScrollPosition();
    const { logoClass } = useLogoSize(scrollPosition);

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
                className={`top-0 z-[80] flex h-[100px] w-full items-center justify-between  gap-10 lg:sticky lg:h-[120px] lg:w-[1200px]
			${scrollPosition > 50 ? 'bg-white' : ''}`}
            >
                <div className='flex w-full items-center justify-between px-4 lg:w-auto lg:justify-center lg:gap-14 lg:px-0'>
                    <Link
                        href={'/'}
                        className='flex items-center justify-center gap-4 sm:gap-10'
                    >
                        <Image
                            src={'/logo-finalv7.png'}
                            alt='logo'
                            width={1432}
                            height={467}
                            className={`w-[150px] lg:w-[215px] 2xl:w-[230px] 3xl:w-[275px] ${logoClass} transition-transform duration-500 ease-in-out`}
                        />
                    </Link>
                    <ul className='hidden items-center justify-center gap-6 font-semibold lg:flex 2xl:pl-4 2xl:text-base 3xl:pl-4'>
                        <li className='linkHoverEffect'>
                            <Link href={'/about'}>A propos</Link>
                        </li>
                        <li className='linkHoverEffect'>
                            <Link href={'#faq'}>FAQ</Link>
                        </li>
                        <li className='linkHoverEffect'>
                            <Link href={'/explore'}>Explorer</Link>
                        </li>
                        <li className='linkHoverEffect'>
                            <Link href={'/ajouter-spot'}>Ajouter un spot</Link>
                        </li>
                    </ul>
                    <div className='block lg:hidden'>
                        <Menu
                            className='fixed right-6 top-8 z-50 text-primary sm:h-8 sm:w-8'
                            onClick={toggleHamburgerMenu}
                        />
                    </div>
                </div>
                <div className='hidden items-center justify-center gap-4 lg:flex 2xl:gap-8'>
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
