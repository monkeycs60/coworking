'use client';

import SignInButtonLogic from '../auth/SignInComponent';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import SignUpButtonLogic from '../auth/SignUpComponent';
import { Menu } from 'lucide-react';
import useScrollPosition from '@/hooks/useScrollPosition';
import useHamburgerMenu from '@/hooks/useHamburgerMenu';
import Hamburger from './Hamburger';
import { AnimatePresence } from 'framer-motion';
import useLogoSize from '@/hooks/useLogoSize';
import { useSession } from 'next-auth/react';

function NavBar() {
    const { isHamburgerOpen, toggleHamburgerMenu } = useHamburgerMenu();
    const scrollPosition = useScrollPosition();
    const { logoClass } = useLogoSize(scrollPosition);

    const { status } = useSession();

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
                className={`fixed top-0 z-[80] flex h-[100px] w-full items-center justify-between gap-10 bg-primary/70 px-4 xl:px-20 3xl:lg:px-32 
			${scrollPosition > 50 ? 'lg:bg-primary/70' : 'lg:bg-transparent'}`}
            >
                <div className='flex w-full items-center justify-between px-4 lg:gap-14 lg:px-0'>
                    <Link
                        href={'/'}
                        className='flex items-center justify-center gap-4 sm:gap-10'
                    >
                        <Image
                            src={'/images/navbar-logo.svg'}
                            alt='logo'
                            width={328}
                            height={65}
                            className={`w-[210px] lg:w-[235px] 2xl:w-[250px] 3xl:w-[300px] ${logoClass} transition-transform duration-500 ease-in-out`}
                        />
                    </Link>
                    <ul className='hidden items-center justify-center gap-12 font-semibold lg:flex 2xl:pl-4 2xl:text-base 3xl:pl-4'>
                        <li className='linkHoverEffect'>
                            <Link href={'/ajouter-lieu'} className='3xl:text-lg'>Ajouter un nouveau lieu</Link>
                        </li>
                        <li className=''>
                            {status === 'authenticated' ? (
                                <Button variant={scrollPosition > 50 ? 'secondary' : 'default'} className='px-8 py-5 3xl:px-12 3xl:py-6 3xl:text-lg'>
                                    <Link href='/profile'>
                                        Profil
                                    </Link>
                                </Button>
                            ) : (
                                    <Button variant={scrollPosition > 50 ? 'secondary' : 'default'} className='px-8 py-5 3xl:px-12 3xl:py-6 3xl:text-lg'>
                                    <Link href='/sign-in'>
                                        Connexion
                                    </Link>
                                </Button>
                            )}
                        </li>
                    </ul >
                    <div className='block lg:hidden'>
                        <Image src={'/images/hamburger.svg'} className='h-6 w-6' alt='hamburger menu' width={56} height={48}
                            onClick={toggleHamburgerMenu}

                        />
                    </div>
                </div >

            </div >
        </>
    );
}

export default NavBar;
