'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

interface HamburgerProps {
    isHamburgerOpen: boolean;
    toggleHamburgerMenu: () => void;
}
const Hamburger = ({
    isHamburgerOpen,
    toggleHamburgerMenu,
}: HamburgerProps) => {
    const { status } = useSession();

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
            className='fixed left-0 top-0 z-[100] h-screen w-screen overflow-hidden bg-primary/90'
        >
            <div className=' flex h-full flex-col  justify-center p-12 text-center text-lg font-semibold sm:text-xl '>
                <div className='flex flex-col gap-6'>
                    <Link
                        href={'/'}
                        className='linkHoverEffect'
                        onClick={toggleHamburgerMenu}
                    >
                        Accueil
                    </Link>
                    <Link
                        href={'/ajouter-lieu'}
                        className='linkHoverEffect'
                        onClick={toggleHamburgerMenu}
                    >
                        Ajouter un lieu
                    </Link>
                </div>

                {(status === 'authenticated') ? (
                    <div className='hamburger-connect-shadow bg mt-24 flex flex-col items-center gap-4 p-6 shadow-xl drop-shadow-xl'>
                        <Link
                            href={'/profile'}
                            className='linkHoverEffect'
                            onClick={toggleHamburgerMenu}
                        >
                            Profil
                        </Link>
                        <div className='linkHoverEffect' onClick={
                            () => signOut()
                        }>
                            <span>Se déconnecter</span>
                        </div>
                    </div>
                ) : (
                    <div className='hamburger-connect-shadow bg mt-24 flex flex-col gap-4 p-6 shadow-xl drop-shadow-xl'>
                        <Link
                            href={'/sign-in'}
                            className='linkHoverEffect'
                            onClick={toggleHamburgerMenu}
                        >
                            <span>Se connecter</span>
                        </Link>

                        <Link
                            href={'/sign-up'}
                            className='linkHoverEffect'
                            onClick={toggleHamburgerMenu}
                        >
                            <span>S'inscrire</span>
                        </Link>

                    </div>
                )}
            </div>
            <X
                size={40}
                className='absolute right-6 top-7'
                onClick={toggleHamburgerMenu}
            />
        </motion.section >
    );
};

export default Hamburger;
